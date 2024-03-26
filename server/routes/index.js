const express = require("express");
const router = express.Router();
const path = require("path");
// import {fs} from "fs";

// import {React} from "react";
// import {ReactDOMServer} from "react-dom/server"
// import {App} from "../../DearHabits/src/App";

// const serverRenderedContent = (req, res, next) => {
//     console.log(__dirname);
//     fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('An error occurred')
//         }
//         return res.send(
//             data.replace(
//                 '<div id="root"></div>',
//                 `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
//             )
//         )
//     })
//   };

// router.use('^/$', serverRenderedContent);
// router.use(
//     express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
// );
/* GET home page. */
router.get("/", (req, res, next) => {
    res.sendFile('dist/index.html', { root: __dirname });
    // res.render("")
    // res.send("hello");
    // console.log("in here");
    // // serverRenderedContent();
    // fs.readFile(path.resolve("/index.html"), "utf", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send("An error occurred");
    //     }
    //     return res.send(data);
    // });
    //     const val = reactDOMserver.renderToString(<App />);
    //     return res.send(
    //         data.replace(
    //           '<div id="root"></div>',
    //           `<div id="root">${val}</div>`
    //         )
    //     );
    // });
    // res.
    // res.sendFile(path.join("public", "index.html"));
    // res.render("index", { title: "Express" });
});

module.exports = router;
