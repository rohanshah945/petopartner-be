const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  registerNewUser,
} = require("../../controllers/auth.controller");
const router = express.Router();

// @route    POST api/auth
// @desc     Login Authorization
// @access   Public
router.post(
  "/",
  [
    check("email", "Please Include a Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginUser
);

// @route    POST api/auth/register
// @desc     Register New User
// @access   Public
router.post(
  "/register",
  [
    check("firstName", "First Name is Required").not().isEmpty(),
    check("email", "Please Include a Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerNewUser
);

module.exports = router;
