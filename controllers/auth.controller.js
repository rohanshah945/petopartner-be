const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    const isMatch = user ? await bcrypt.compare(password, user.password) : null;
    const error = {
      password: user && isMatch ? null : "Check your email or password",
    };

    if (error.password === null) {
      const access_token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
      });

      const response = {
        user,
        access_token,
      };
      return res.status(200).json(response);
    }
    return res.status(400).json({ error });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.registerNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const isEmailExists = await User.findOne({ email });
    const error = {
      email: isEmailExists ? "The email is already in use" : null,
      firstName: firstName !== "" ? null : "First Name is Required",
      lastName: lastName !== "" ? null : "Last Name is Required",
      password: null,
    };
    if (
      error.firstName === null &&
      error.password === null &&
      error.email === null
    ) {
      const user = new User({
        password,
        firstName: firstName,
        lastName: lastName,
        email,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user.save((err, data) => {
        if (err) {
          res.status(400).json({ errors: [{ msg: err }] });
        }
      });

      const access_token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
      });

      const response = {
        user,
        access_token,
      };

      return res.status(200).json(response);
    }
    return res.status(400).json({ error });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
