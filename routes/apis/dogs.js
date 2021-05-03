const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getDogsData,
  getDogsDataByUser,
  addDogData,
  updateDogData,
  deleteDogData,
} = require("../../controllers/dogs.controller");
const { addLike } = require("../../controllers/matches.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const router = express.Router();

// @route    GET api/dogs
// @desc     Get All Dogs
// @access   Private
router.get("/", authMiddleware, getDogsData);

// @route    GET api/dogs/byUser
// @desc     Get All Dogs Filtered by Single User
// @access   Private
router.get("/byUser", authMiddleware, getDogsDataByUser);

// @route    POST api/dogs
// @desc     Add New Dog
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("age", "Age is Required").not().isEmpty(),
    check("breed", "Breed is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authMiddleware,
  addDogData
);

// @route    PUT api/dogs/:dogId
// @desc     Update Dog's Details
// @access   Private
router.put(
  "/:dogId",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("age", "Age is Required").not().isEmpty(),
    check("breed", "Breed is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authMiddleware,
  updateDogData
);

// @route    DELETE api/dogs/:dogId
// @desc     Delete Dog's Details
// @access   Private
router.delete("/:dogId", authMiddleware, deleteDogData);

// @route    PATCH api/dogs/:dogId/likes
// @desc     Like Dog
// @access   Private
router.patch("/:dogId/likes", authMiddleware, addLike);

module.exports = router;
