const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
require("dotenv").config();

// const fs = require("fs");
// const react = require("react");
// const reactDOMserver = require("react-dom/server");
// // const App = require("../../DearHabits/src/App");
// import App from "../DearHabits/src/App";

// implementing routing
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const habitsRouter = require("./routes/habit");

// connection to database
// const db = require("./config/db");

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(path.resolve(__dirname, "dist")));
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

const PORT = process.env.PORT || 8080;

const cors = require("cors");
// var corsOptions = {
//   origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/api/habits", habitsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
  });
  
  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send("error");
  });  

app.listen(process.env.PORT, () => {
    console.log("Port used: ", process.env.PORT);
  });

module.exports = app;