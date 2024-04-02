const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
require("dotenv").config();
const neo4jSessionCleanup = require("./middlewares/neo4jSessionCleanup")

// implementing routing
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const habitsRouter = require("./routes/habit");
const friendsRouter = require("./routes/friends");

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

// the static frontend files are bundled in the dist folder
app.use(express.static(path.resolve(__dirname, "dist")));

const PORT = process.env.PORT || 5001;

const cors = require("cors");
// var corsOptions = {
//   origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
// };
// app.use(cors(corsOptions));

//enable CORS
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });
app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(neo4jSessionCleanup);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/api/habits", habitsRouter);
app.use("/api/friends", friendsRouter);

// app.get("/*", function (req, res) {
//   console.log("path.join: ",path.join(__dirname, "dist/index.html"));
//   res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });
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
  

app.listen(PORT, () => {
    console.log("Port used: ", PORT);
    console.log("path: ", __dirname);
    console.log("path.join: ",path.join(__dirname, "dist/index.html"));
  });

module.exports = app;