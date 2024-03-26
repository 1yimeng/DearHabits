const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* GET users listing. */
router.get("/", (req, res, next) => {
    db.query(
        "SELECT * FROM users",
        (err, results, fields) => {
          if (!err) {
            res.send(results);
            // db.end();
          } else {
            console.log(err);
            // db.end();
          }
        }
    );
});

module.exports = router;