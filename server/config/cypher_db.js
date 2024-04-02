const neo4j = require("neo4j-driver");
// import neo4j from "neo4j-driver";

const driver = neo4j.driver(
    "neo4j+s://bc282f07.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "gf6G1e_ACoBfGe5A_lf8om009aTF-iLfhy-rZ5rVyEE")
);

exports.getSession = function (context) {
    if(context.neo4jSession) {
      return context.neo4jSession;
    }
    else {
      context.neo4jSession = driver.session();
      return context.neo4jSession;
    }
  };