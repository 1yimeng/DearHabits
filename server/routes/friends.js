const express = require("express");
const cors = require("cors");
const _neo = require("neo4j-driver");
const router = express.Router();
const User = require('../models/user')
  , _ = require('lodash')
  , writeResponse = require('../helpers/response').writeResponse
  , dbUtils = require('../config/cypher_db');

router.use(cors());
router.use(express.json());

/* GET all friends of user */
router.get('/:user', (req,res) => {
    const user = req.params.user;
    console.log("All Friends - received user: ", user);
    User.getAllFriends(dbUtils.getSession(req), user)
        .then(response => {
            console.log("All Friends - server response: ",response);
            let results = [];
            response.forEach(element => {
                results.push([element, 1]);
            });
            console.log("All Friends - results: ",results);
            return res.json(results);
            // writeResponse(res, response);
        })
        .catch(err => {
            return res.json(err);
        });
});

// GET all the friend requests SENT BY user
router.get('/:user/requests/sent', (req, res) => {
    const user = req.params.user;
    User.getAllSentRequests(dbUtils.getSession(req), user)
    .then(response => {
        console.log("Sent Requests - server response: ",response);
        let results = [];
        response.forEach(element => {
            results.push([element, 0]);
        });
        console.log("Sent Requests - results: ",results);
        return res.json(results);
        // writeResponse(res, response);
    })
    .catch(err => {
        return res.json(err);
    });
});

// GET all the friend requests RECEIVED BY the user
router.get('/:user/requests/received', (req, res) => {
    const user = req.params.user;
    console.log("Received Requests - received user: ", user);
    User.getAllRecvRequests(dbUtils.getSession(req), user)
        .then(response => {
            console.log("Received Requests - server response: ",response);
            return res.json(response);
        })
        .catch(err => {
            return res.json(err);
        });
});

// Create a new request
router.post('/requests/:sender/:receiver', (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    User.newFriendRequest(dbUtils.getSession(req), sender, receiver)
    .then(response => {
        console.log("Received Requests - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

// Delete friend request
router.delete('/requests/:sender/:receiver', (req, res, next) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    User.deleteFriendRequest(dbUtils.getSession(req), sender, receiver)
    .then(response => {
        console.log("Delete Request - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

// Add new friend
router.post('/add/:user/:user2', (req, res, next) => {
    const user = req.params.user;
    const user2 = req.params.user2;
    User.newFriend(dbUtils.getSession(req), user, user2)
    .then(response => {
        console.log("Add Friend - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

// remove a friend
router.delete('/delete/:user/:user2', (req, res) => {
    const user = req.params.user;
    const user2 = req.params.user2;
    User.removeFriend(dbUtils.getSession(req), user, user2)
    .then(response => {
        console.log("Remove Friend - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

// delete a user from the social graph and remove their relationships
router.delete('/delete/:user', (req, res, next) => {
    const user = req.params.user;
    User.deleteUser(dbUtils.getSession(req), user)
    .then(response => {
        console.log("Delete User - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

router.post(`/create/:user`, (req,res) => {
    console.log("in create user");
    const user = req.params.user;
    User.createUser(dbUtils.getSession(req), user)
    .then(response => {
        console.log("Create User - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

router.get(`/search/:user`, (req, res) => {
    const user = req.params.user;
    User.searchUser(dbUtils.getSession(req), user)
    .then(response => {
        console.log("Search User - server response: ",response);
        return res.json(response);
    })
    .catch(err => {
        return res.json(err);
    });
});

module.exports = router;