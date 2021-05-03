const mongoose = require("mongoose");
const Match = require("../models/matches.model");
const Dog = require("../models/dogs.model");

exports.getMatchesData = async (req, res) => {
  try {
    Match.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ matches: data });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.addLike = async (req, res) => {
  const dogId = req.params.dogId;
  const user = req.user;
  try {
    const dog = await Dog.findById(dogId);

    if (!dog) {
      return res.status(400).json({ errors: [{ msg: "No dog found." }] });
    }

    if (dog.likes.includes(user._id)) {
      dog.likes.remove(user._id);
      await Match.findOneAndDelete(
        {
          from: new mongoose.Types.ObjectId(user._id),
          to: new mongoose.Types.ObjectId(dog.user),
        },
        (err, data) => {
          console.log("this is from initiator");
        }
      );

      const isMatchExist = await Match.findOne({
        from: dog.user,
        to: user._id,
      });
      if (isMatchExist) {
        isMatchExist.isMatch = false;
        isMatchExist.save((err, data) => {
          console.log("this is from non-initiator");
        });
      }
    } else {
      dog.likes.push(user._id);
    }

    dog.save(async (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        const isMatchFind = await Match.findOne({
          to: user._id,
          from: dog.user,
        });
        if (isMatchFind) {
          isMatchFind.isMatch = true;
          isMatchFind.save((err, matchData) => {
            if (err) {
              res.status(400).json({ errors: [{ msg: err }] });
            } else if (matchData) {
              return res
                .status(200)
                .json({ dog: data, message: "Its a match" });
            }
          });
        } else if (`${user._id}` !== `${dog.user}`) {
          const newMatch = new Match({
            from: user._id,
            to: dog.user,
          });
          newMatch.save((err, data) => {
            if (err) {
              res.status(400).json({ errors: [{ msg: err }] });
            } else if (data) {
              return res.status(200).json({ dog: dog });
            }
          });
        } else {
          return res.status(200).json({ dog: dog });
        }
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};
