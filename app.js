// Importing modules
const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");
require("dotenv").config();

// Importing Routes
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT;

// Setting up a view Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setting up built in middleware
app.use(logger("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

// Setting up custom router
app.use("/", indexRouter);


// Catching errors and unhandled requests

app.use(function(req, res, next){
  next(createError(404));
});

app.use((err, req, res) => {
  // Register error in locals
  res.locals.message = err.message;
  res.locals.error = app.req.get("env") === "developement" ? err : {};

  // Setting response status and rendering page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

module.exports = app;