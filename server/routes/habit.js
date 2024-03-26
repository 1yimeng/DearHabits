const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* GET habits listing. */
router.get('/', (req,res) => {
  db.query(
    "SELECT * FROM habits",
    (err, results, fields) => {
      if (!err) {
        console.log("server results: \n", results);
        // console.log()
        // res.send(results);
        res.json(results);
        // db.end();
      } else {
        console.log(err);
        // db.end();
      }
    }
);
  // var list = ["item1", "item2", "item3"];
  // res.json(list);
  // console.log('Sent list of items');
});

module.exports = router;