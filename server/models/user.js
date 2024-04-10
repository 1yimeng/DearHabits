const _ = require('lodash');

// return many people
function manyUsers(neo4jResult) {
    let map = [];
    neo4jResult.records.forEach(r => {
        map.push( r.get("email"))
    });
    return map;
}

const getAllFriends = function(session, email) {
    const query = [
        'MATCH (user:User {email: $email})-[:FRIENDS]-(friend:User)',
        'RETURN DISTINCT friend.email AS email'
    ].join('\n');

    return session.readTransaction(txc => 
        txc.run(query, {email: email})   
        ).then(result => manyUsers(result)); 
};

const getAllRecvRequests = function(session, email) {
    const query = [
        'MATCH (user:User {email: $email})<-[:REQUESTS]-(requester:User)',
        'RETURN DISTINCT requester.email AS email'
    ].join('\n');

    return session.readTransaction(txc => 
        txc.run(query, {email: email})    
    ).then(result => manyUsers(result));
};

const getAllSentRequests = function(session, email) {
    const query = [
        'MATCH (user:User {email: $email})-[:REQUESTS]->(requestee:User)',
        'RETURN DISTINCT requestee.email AS email'
    ].join('\n');

    return session.readTransaction(txc => 
        txc.run(query, {email: email})    
    ).then(result => manyUsers(result)); 
};

const newFriendRequest = function(session, sender, receiver) {
    const query = [
        'MATCH (sender:User {email: $sender}), (receiver:User {email: $receiver})',
        'CREATE (sender)-[:REQUESTS]->(receiver);'
    ].join('\n');

    return session.writeTransaction(txc =>
      txc.run(query, {sender: sender, receiver: receiver})  
    );
};

const deleteFriendRequest = function(session, sender, receiver) {
    const query = [
        'MATCH (sender:User {email: $sender})-[r:REQUESTS]->(receiver:User {email: $receiver})',
        'DELETE r;'
    ].join('\n');

    return session.writeTransaction(txc =>
      txc.run(query, {sender: sender, receiver: receiver})  
    );
};

const newFriend = function(session, user, user2) {
    const query = [
        'MATCH (user:User {email: $user}), (user2:User {email: $user2})',
        'CREATE (user)-[:FRIENDS]->(user2);'
    ].join('\n');

    return session.writeTransaction(txc =>
      txc.run(query, {user: user, user2: user2})  
    );    
};

const removeFriend = function(session, user, user2) {
    const query = [
        'MATCH (user:User {email: $user})-[r:FRIENDS]-(user2:User {email: $user2})',
        'DELETE r;'
    ].join('\n');

    return session.writeTransaction(txc =>
      txc.run(query, {user: user, user2: user2})  
    );  
};

const deleteUser = function(session, user) {
    const query = [
        'MATCH (user:User {email: $user})',
        'DETACH DELETE user;'
    ].join('\n');

    return session.writeTransaction(txc =>
        txc.run(query, {user: user, user2: user2})  
      );  
};

const createUser = function(session, user) {
    const query = [
        'CREATE (user:User {email: $user})'
    ].join('\n');

    return session.writeTransaction(txc =>
        txc.run(query, {user: user})    
    );
};

const searchUser = function(session, user) {
    const query = [
        'MATCH (user:User {email: $user})',
        'RETURN DISTINCT user.email AS email;'
    ].join(`\n`);

    return session.readTransaction(txc =>
        txc.run(query, {user: user})
    ).then(result => manyUsers(result)); 
};

module.exports = {
    getAllFriends: getAllFriends,
    getAllRecvRequests: getAllRecvRequests,
    getAllSentRequests: getAllSentRequests,
    newFriendRequest: newFriendRequest,
    deleteFriendRequest: deleteFriendRequest,
    newFriend: newFriend,
    removeFriend: removeFriend,
    deleteUser: deleteUser,
    createUser: createUser,
    searchUser: searchUser
};