const express = require("express");
const chalk = require('chalk')
require('dotenv').config()
const morgan = require("morgan");
const mongoose = require("mongoose");
const createPath = require('./helpers/create-path')
const methodOverride = require("method-override");
const postRouter = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactRouter = require('./routes/contact-routes')

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set("view engine", "ejs");



mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg("Connected to DB")))
  .catch((error) => console.log(errorMsg(error)));



app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("styles"));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});


app.use(postRouter)
app.use(contactRouter)
app.use(postApiRoutes)

app.use((req, res) => {
  const title = "Error Page";
  res
  .status(404)
  .render(createPath("error"), { title });
});
