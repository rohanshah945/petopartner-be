const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getQueryData,
  addQueryData,
} = require("../../controllers/queries.controller");
const router = express.Router();

// @route    GET api/contact-us
// @desc     Get All Contact Queries
// @access   Public
router.get("/", getQueryData);

// @route    POST api/contact-us
// @desc     Add New Query / Submit Contact Us Form
// @access   Public
router.post(
  "/",
  [
    check("firstName", "First Name is Required").not().isEmpty(),
    check("email", "Please Include a Valid Email").isEmail(),
    check("message", "Message is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addQueryData
);
module.exports = router;
