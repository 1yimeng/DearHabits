const express = require("express");
const cors = require("cors")
const router = express.Router();
const db = require("../config/db");
router.use(cors());
router.use(express.json());

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

router.post("/create", (req, res) => {
  const query = "INSERT INTO `users` (`Email`, `Password_Hash`) VALUES (?)";
  const values = [req.body.Email, req.body.Password_Hash];
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router;