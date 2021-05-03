const Dog = require("../models/dogs.model");

exports.getDogsData = async (req, res) => {
  try {
    Dog.find()
      .populate("user", ["-password"])
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ dogs: data });
        }
      });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.getDogsDataByUser = async (req, res) => {
  try {
    Dog.find({ user: req.user._id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ dogs: data });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.addDogData = async (req, res) => {
  const { name, age, breed, photoURL, description } = req.body;
  const user = req.user;

  try {
    const dog = new Dog({
      name,
      age,
      breed,
      photoURL,
      user: user._id,
      description,
    });

    dog.save((err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ dog: data });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.updateDogData = async (req, res) => {
  const { name, age, breed, photoURL, description } = req.body;
  const dogId = req.params.dogId;

  const payload = {
    name,
    age,
    breed,
    photoURL,
    description,
  };

  try {
    const dog = await Dog.findById(dogId).populate("users");

    if (!dog) {
      return res.status(400).json({ errors: [{ msg: "No Dog Found" }] });
    } else if (`${dog.user._id}` !== `${req.user._id}`) {
      return res
        .status(401)
        .json({ errors: [{ msg: "The user is not authorized" }] });
    } else {
      Dog.findByIdAndUpdate(dogId, payload, { new: true }, (err, data) => {
        if (err) {
          res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ dog: data });
        }
      });
    }
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteDogData = async (req, res) => {
  const dogId = req.params.dogId;

  try {
    const dog = await Dog.findById(dogId).populate("users");

    if (!dog) {
      return res.status(400).json({ errors: [{ msg: "No Dog Found" }] });
    } else if (`${dog.user._id}` !== `${req.user._id}`) {
      return res
        .status(401)
        .json({ errors: [{ msg: "The user is not authorized" }] });
    } else {
      dog.remove((err, data) => {
        if (err) {
          res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ dog: data });
        }
      });
    }
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};
