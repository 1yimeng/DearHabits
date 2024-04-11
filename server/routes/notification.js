const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.use(express.json());

// Habit Queries
router.get("/habits/:frequency", (req, res) => {
    const query = "SELECT `id` FROM `habits` WHERE `Is_Completed` = 0 AND `Frequency` = ?";
    db.query(query, [req.params.frequency], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

router.put("/habits/reset/:frequency", (req, res) => {
    const query = "UPDATE `habits` JOIN `habit_groupings` ON `habits`.`id` = `habit_groupings`.`hid` SET `habits`.`Streak_Num` = 0, `habit_groupings`.`Streak_Num` = 0 WHERE `habits`.`Is_Completed` = 0 AND `habits`.`Frequency` = ?";
    db.query(query, [req.params.frequency], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

router.put("/habits/restart/:frequency", (req, res) => {
    const query = "UPDATE `habits` SET `Is_Completed` = 0 WHERE `Frequency` = ?";
    db.query(query, [req.params.frequency], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

// User Queries
router.get("/user/:frequency", (req, res) => {
    const query = "SELECT `Email` FROM `users` WHERE `Notif_Frequency` = ?";
    db.query(query, [req.params.frequency], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

router.put("/user/:email", (req, res) => {
    const query = "UPDATE `users` SET `Notif_Frequency` = ? WHERE `Email` = ?";
    db.query(query, [req.body.frequency, req.params.email], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
})

module.exports = router;