const _ = require('lodash');
const User = require('../models/neo4j/user');

const _singleUserWithDetails = function (record) {
    if (record.length) {
      const result = {};
      _.extend(result, new User(record.get('user')));
      result.friends = _.map(record.get('friends'), record => {
        return record;
      });
      result.requests_to = _.map(record.get('requests_to'), record => {
        return record;
      });
      result.requests_from = _.map(record.get('requests_from'), record => {
        return record;
      });
      // mappings are temporary until the neo4j driver team decides what to do about numbers
      return result;
    }
    else {
      return null;
    }
  };

  // return many people
function manyUsers(neo4jResult) {
    let map = [];
    neo4jResult.records.forEach(r => {
        map.push( r.get("email"))
    });
    // console.log(neo4jResult.records.fo)
    return map;
}

const getAllRelations = function (session, email) {
    const query = [
        'MATCH (user:User {email: $email})',
        'OPTIONAL MATCH (user)-[:FRIENDS]-(u:User)',
        'OPTIONAL MATCH (user)-[:REQUESTS]->(u:User)',
        'OPTIONAL MATCH (user)<-["REQUESTS]-(u:User)',
        'RETURN DISTINCT user,',
        'collect(DISTINCT {email:friend.email}) AS friends,',
        'collect(DISTINCT {email:request_to.email}) AS requests_to,',
        'collect(DISTINCT {email:request_from.email}) AS requests_from'
    ].join('\n');

    return session.readTransaction(txc => 
        txc.run(query, {email: email})    
    // ).then(result => manyUsers(result));
    ).then(result =>  {
        if (!_.isEmpty(result.records)) {
            return _singleUserWithDetails(result.records[0]);
          }
          else {
            throw {message: 'person not found', status: 404}
          }
    });
};

const getAllFriends = function(session, email) {
    console.log("user function received: ", email);
    const query = [
        'MATCH (user:User {email: $email})-[:FRIENDS]-(friend:User)',
        'RETURN DISTINCT friend.email AS email'
    ].join('\n');

    return session.readTransaction(txc => 
        txc.run(query, {email: email})   
        ).then(result => manyUsers(result)); 
};

const getAllRecvRequests = function(session, email) {
    console.log("user getAllRecvRequests received: ", email);
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

module.exports = {
    getAllRelations: getAllRelations,
    getAllFriends: getAllFriends,
    getAllRecvRequests: getAllRecvRequests,
    getAllSentRequests: getAllSentRequests,
    newFriendRequest: newFriendRequest,
    deleteFriendRequest: deleteFriendRequest,
    newFriend: newFriend,
    removeFriend: removeFriend,
    deleteUser: deleteUser,
};