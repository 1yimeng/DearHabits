const express = require("express");
const cors = require("cors")
const router = express.Router();
const db = require("../config/db");
router.use(cors());
router.use(express.json());

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

// Read Habit and Groupings from the Database
router.get('/read/:user', (req, res) => {
  const query = "SELECT * FROM `habits` WHERE `User_Name`=?";
  const user = req.params.user;
  db.query(query, [user], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})
router.get('/read/groupings/:id', (req, res) => {
  const query = "SELECT * FROM `habit_groupings` WHERE `Hid` in (?)";
  const hid = req.params.id.split("+");
  db.query(query, [hid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})

// Create Habit and Groupings in the Database
router.post('/create', (req, res) => {
  const query = "INSERT INTO habits (`User_Name`, `Name`, `Privacy`, `Frequency`, `Streak_Num`, `Is_Completed`) VALUES (?)";
  const values = [req.body.User_Name, req.body.Name, req.body.Privacy, req.body.Frequency, req.body.Streak_Num, req.body.Is_Completed];
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})
router.post('/create/groupings', (req, res) => {
  const query = "INSERT INTO `habit_groupings` (`Hid`, `Label`, `Type`, `Value`, `Upper_Bound`, `Lower_Bound`, `Num_Intervals`) VALUES ?"
  const count = req.body.count;
  const values = [];
  for (let i=1; i<count; i++) {
    values.push([req.body[i].Hid, req.body[i].Label, req.body[i].Type, JSON.stringify(req.body[i].Values), req.body[i].Upper_Bound, req.body[i].Lower_Bound, req.body[i].Num_Intervals])
  }
  db.query(query, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})

// Update a Habit in the Database
router.put('/update/:id', (req, res) => {
  const query = "UPDATE habits SET `Name` = ?, `Privacy` = ?, `Frequency` = ?, `Streak_Num` = ?, `Is_Completed` = ? WHERE `id` = ?";
  const values = [req.body.Name, req.body.Privacy, req.body.Frequency, req.body.Streak_Num, req.body.Is_Completed, req.params.id];
  db.query(query, values, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

// Delete Habit and it's Groupings from the Database
router.delete('/delete/:id', (req, res) => {
  const query = "DELETE FROM `habits` WHERE id = ?";
  const id = req.params.id;
  db.query(query, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})
router.delete('/delete/groupings/:hid', (req, res) => {
  const query = "DELETE FROM `habit_groupings` WHERE Hid = ?"
  const hid = req.params.hid;
  db.query(query, [hid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router;