const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware that validates the JWT Token.
exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, Authorization Denied" }] });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is Not Valid" });
      } else {
        User.findById(decoded._id, (err, data) => {
          if (err) {
            res.status(400).json({ errors: [{ msg: err }] });
          } else if (!data) {
            res.status(401).json({ errors: [{ msg: "Token is Not Valid" }] });
          } else {
            req.user = data;
            next();
          }
        });
      }
    });
  } catch (err) {
    console.error(`Something went Wrong with auth Middleware : ${err}`);
    res.status(500).json({ msg: "Server Error" });
  }
};
