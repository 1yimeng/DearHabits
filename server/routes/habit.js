const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.use(express.json());

// Read Habit and Groupings from the Database
router.get('/read/:user', (req, res) => {
  const query = "SELECT * FROM `habits` WHERE `User_Name`=?";
  const user = req.params.user;
  db.query(query, [user], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});
router.get('/read/groupings/:id', (req, res) => {
  const query = "SELECT * FROM `habit_groupings` WHERE `Hid` in (?)";
  const hid = req.params.id.split("+");
  db.query(query, [hid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Create Habit and Groupings in the Database
router.post('/create', (req, res) => {
  const query = "INSERT INTO habits (`User_Name`, `Name`, `Privacy`, `Frequency`, `Streak_Num`, `Is_Completed`) VALUES (?)";
  const values = [req.body.User_Name, req.body.Name, req.body.Privacy, req.body.Frequency, req.body.Streak_Num, req.body.Is_Completed];
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});
router.post('/create/groupings', (req, res) => {
  const query = "INSERT INTO `habit_groupings` (`Hid`, `Label`, `Type`, `Value`, `Upper_Bound`, `Lower_Bound`, `Num_Intervals`, `Streak_Num`, `Longest_Streak`) VALUES ?"
  const count = req.body.count;
  const values = [];
  for (let i=1; i<count; i++) {
    values.push([req.body[i].Hid, req.body[i].Label, req.body[i].Type, JSON.stringify(req.body[i].Values), req.body[i].Upper_Bound, req.body[i].Lower_Bound, req.body[i].Num_Intervals, req.body[i].Streak_Num, req.body[i].Longest_Streak])
  }
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Update a Habit in the Database
router.put('/update/:id', (req, res) => {
  const query = "UPDATE habits SET `Name` = ?, `Privacy` = ?, `Frequency` = ?, `Streak_Num` = ?, `Is_Completed` = ? WHERE `id` = ?";
  const values = [req.body.Name, req.body.Privacy, req.body.Frequency, req.body.Streak_Num, req.body.Is_Completed, req.params.id];
  db.query(query, values, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});
router.put('/update/groupings/:id', (req, res) => {
  const query = "UPDATE `habit_groupings` SET `Value` = ? WHERE `Gid` = ?";
  db.query(query, [req.body.values, req.params.id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Delete Habit and it's Groupings from the Database
router.delete('/delete/:id', (req, res) => {
  const query = "DELETE FROM `habits` WHERE id = ?";
  const id = req.params.id;
  db.query(query, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});
router.delete('/delete/groupings/:hid', (req, res) => {
  const query = "DELETE FROM `habit_groupings` WHERE Hid = ?"
  const hid = req.params.hid;
  db.query(query, [hid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});
router.delete('/delete/posts/:hid', (req, res) => {
  const query = "DELETE FROM `posts` WHERE Hid = ?"
  const hid = req.params.hid;
  db.query(query, [hid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Create a Post in the Database when a Habit is completed
router.post('/create/post', (req, res) => {
  const query = "INSERT INTO posts (`Time`, `Hid`, `User_email`, `Reactions`) VALUES (?)"
  const values = [req.body.time, req.body.hid, req.body.email, JSON.stringify({})];
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Get all Post's Hids from Friends
router.get('/read/posts/:emails', (req, res) => {
  const query = "SELECT `Hid`, `Pid`, `Reactions`, `Time` FROM posts WHERE `User_email` IN (?) ORDER BY `Pid` DESC";
  const emails = req.params.emails.split(",");
  db.query(query, [emails], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Get all Habits based upon Id
router.get('/read/habits/:ids', (req, res) => {
  const query = "SELECT * FROM `habits` WHERE `id` IN (?)";
  const ids = req.params.ids.split("+");
  db.query(query, [ids], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Update post's Reactions in the Database
router.put('/posts/update/:pid', (req, res) => {
  const query = "UPDATE `posts` SET `Reactions` = ? WHERE `Pid` = ?"
  const values = [JSON.stringify(req.body.update), req.params.pid];
  db.query(query, values, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

module.exports = router;