const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.use(express.json());

router.post("/create", (req, res) => {
  const query = "INSERT INTO `users` (`Email`) VALUES (?)";
  const values = [req.body.Email];
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})

router.get("/frequency/:email", (req, res) => {
  const query = "SELECT `Notif_Frequency` FROM `users` WHERE `Email` = ?";
  db.query(query, [req.params.email], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
})

router.put("/update/:email", (req, res) => {
  const query = "UPDATE `users` SET `Notif_Frequency` = ? WHERE `Email` = ?";
  db.query(query, [req.body.freq, req.params.email], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;