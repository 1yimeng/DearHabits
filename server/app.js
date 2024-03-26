const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

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

// ??
const cors = require("cors");

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(path.resolve(__dirname, "dist")));
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

const PORT = process.env.PORT || 5001;

app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/api/habits", habitsRouter);

// An api endpoint that returns a short list of items
// app.get('/api/habits', (req,res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log('Sent list of items');
// });
// app.get('*', (req, res) => {
//   res.sendFile('dist/index.html', { root: __dirname });
// });

// app.get('*', function(res,req){
//   res.sendFile(path.resolve(__dirname ,'/dist/index.html'));
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
    // console.log(process.env);
    console.log("Port used: ", PORT);
  });

module.exports = app;