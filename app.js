const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/apis/auth");
const dogsRoute = require("./routes/apis/dogs");
const blogsRoute = require("./routes/apis/blogs");
const queriesRoute = require("./routes/apis/queries");

// App Config
const app = express();
dotenv.config(); // To use environment variables

// Middleware
app.use(express.json({ limit: "15mb" })); // This is used for body-parser
app.use(cors()); // This is used to enable CORS

// mongoDB Config
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: `Server is Running` });
});

// * Users Routes
app.use("/api/auth", authRoute);
app.use("/api/dogs", dogsRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/contact-us", queriesRoute);

// Exporting Module
module.exports = app;
