const Blog = require("../models/blogs.model");

exports.getBlogs = async (req, res) => {
  try {
    Blog.find()
      .select("-body")
      .populate("user")
      .sort({ created_date: -1 })
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ blogs: data });
        }
      });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.getBlogsUsingSlug = async (req, res) => {
  const { slug } = req.params;
  try {
    Blog.findOne({ slug }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      } else if (!data) {
        res.status(400).json({ errors: [{ msg: "No Blog Found" }] });
      } else if (data) {
        res.status(200).json({ blog: data });
      }
    }).populate("user");
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.addBlog = async (req, res) => {
  const { title, description, body } = req.body;
  const user = req.user;
  const slug = title.split(" ").join("-").toLowerCase();

  const payload = {
    title,
    slug,
    description,
    body,
    user: user._id,
  };

  try {
    const isBlogPostExist = await Blog.findOne({ slug });

    if (isBlogPostExist) {
      return res.status(400).json({
        errors: [{ msg: "Blog Post with similar title is already exist" }],
      });
    }

    const blog = new Blog(payload);

    blog.save((err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      } else if (data) {
        res.status(200).json({ blog: data });
      }
    });
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, description, body } = req.body;
  const slug = req.params.slug;
  const user = req.user;
  // const slug = title.split(" ").join("-").toLowerCase();

  const payload = {
    title,
    slug,
    description,
    body,
    user: user._id,
  };

  try {
    const blog = await Blog.findOne({ slug }).populate("users");

    if (!blog) {
      return res.status(400).json({ errors: [{ msg: "No Blog Post Found" }] });
    } else if (`${blog.user._id}` !== `${req.user._id}`) {
      return res
        .status(401)
        .json({ errors: [{ msg: "The user is not authorized" }] });
    } else {
      Blog.findOneAndUpdate({ slug }, payload, { new: true }, (err, data) => {
        if (err) {
          res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ blog: data });
        }
      });
    }
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const slug = req.params.slug;

  try {
    const blog = await Blog.findOne({ slug }).populate("users");

    if (!blog) {
      return res.status(400).json({ errors: [{ msg: "No Blog Post Found" }] });
    } else if (`${blog.user._id}` !== `${req.user._id}`) {
      return res
        .status(401)
        .json({ errors: [{ msg: "The user is not authorized" }] });
    } else {
      blog.remove((err, data) => {
        if (err) {
          res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          res.status(200).json({ blog: data });
        }
      });
    }
  } catch (error) {
    console.error(`Something went Wrong: ${error}`);
    res.status(500).json({ msg: "Server Error" });
  }
};
