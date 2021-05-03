const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getBlogs,
  getBlogsUsingSlug,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../../controllers/blogs.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const router = express.Router();

// @route    GET api/blogs
// @desc     Get All Blog Posts
// @access   Public
router.get("/", getBlogs);

// @route    GET api/blogs/:slug
// @desc     Get Blog Post using Slug
// @access   Public
router.get("/:slug", getBlogsUsingSlug);

// @route    POST api/blogs
// @desc     Add New Blog Post
// @access   Private
router.post(
  "/",
  [
    check("title", "Title is Required").not().isEmpty(),
    check("description", "Description is Required").not().isEmpty(),
    check("body", "Blog Body is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authMiddleware,
  addBlog
);

// @route    PUT api/blogs/:slug
// @desc     Update Blog's Details
// @access   Private
router.put(
  "/:slug",
  [
    check("title", "Title is Required").not().isEmpty(),
    check("description", "Description is Required").not().isEmpty(),
    check("body", "Blog Body is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authMiddleware,
  updateBlog
);

// @route    DELETE api/dogs/:slug
// @desc     Delete Blog Post
// @access   Private
router.delete("/:slug", authMiddleware, deleteBlog);

module.exports = router;
