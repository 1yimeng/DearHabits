const mysql = require('mysql');

const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'root';
const PW = process.env.DB_PW || '';
const NAME = process.env.DB_NAME || 'dear_habits';

const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PW,
    database: NAME
});

// connection.connect((err) => {
//     if (!err) {
//       console.log("Connected");
//     } else {
//       console.log("Connection Failed");
//     //   connection.end();
//     }
// });

module.exports = connection;