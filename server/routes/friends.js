const express = require("express");
const cors = require("cors")
const router = express.Router();
const User = require('../models/user')
  , _ = require('lodash')
  , writeResponse = require('../helpers/response').writeResponse
  , dbUtils = require('../config/cypher_db');

router.use(cors());
router.use(express.json());

/* GET all friends of user */
router.get('/:user', (req,res, next) => {
    const user = req.params.user;
    User.getAllFriends(dbUtils.getSession(req), user)
        .then(response => writeResponse(res, response))
        .catch(next);
});

// GET all the friend requests sent by user
router.get('/requests:user/sent', (req, res, next) => {
    const user = req.params.user;
    User.getAllSentRequests(dbUtils.getSession(req), user)
        .then(response => writeResponse(res, response))
        .catch(next);
});

// GET all the friend requests the user has received
router.get('/requests:user/received', (req, res, next) => {
    const user = req.params.user;
    User.getAllRecvRequests(dbUtils.getSession(req), user)
        .then(response => writeResponse(res, response))
        .catch(next);
});

// Create a new request
router.post('/requests:sender/:receiver', (req, res, next) => {
    const sender = req.params.user;
    const receiver = req.params.receiver;
    User.newFriendRequest(dbUtils.getSession(req), sender, receiver)
        .then(_ => writeResponse(res, {}))
        .catch(next);
});

// Delete friend request
router.delete('/requests:sender/:receiver', (req, res, next) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    User.deleteFriendRequest(dbUtils.getSession(req), sender, receiver)
    .then(_ => writeResponse(res, {}))
    .catch(next);
});

// Add new friend
router.post('/:user/:user2', (req, res, next) => {
    const user = req.params.user;
    const user2 = req.params.user2;
    User.newFriend(dbUtils.getSession(req), user, user2)
        .then(_ => writeResponse(res, {}))
        .catch(next);
});

// remove a friend
router.delete('/:user/:user2', (req, res, next) => {
    const user = req.params.user;
    const user2 = req.params.user2;
    User.removeFriend(dbUtils.getSession(req), user, user2)
        .then(_ => writeResponse(res, {}))
        .catch(next);
});

// delete a user from the social graph and remove their relationships
router.delete('/:user', (req, res, next) => {
    const user = req.params.user;
    User.deleteUser(dbUtils.getSession(req), user)
        .then(_ => writeResponse(res, {}))
        .catch(next);
});

module.exports = router;