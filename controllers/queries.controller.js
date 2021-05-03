const Query = require("../models/queries.model");

exports.getQueryData = async (req, res) => {
  try {
    Query.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ queries: data });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.addQueryData = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const query = new Query({
      firstName,
      lastName,
      email,
      message,
    });

    query.save((err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ success: "Message sent successfully." });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};
