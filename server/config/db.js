const mysql = require('mysql');

const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'root';
const PW = process.env.DB_PW || '';
const NAME = process.env.DB_NAME || 'dear_habits';

// const connection = mysql.createConnection({
//     host: HOST,
//     user: USER,
//     password: PW,
//     database: NAME
// });

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PW,
    database: NAME,
    port: 3306,
    connectionLimit: 25
});

// connection.connect((err) => {
//     if (!err) {
//       console.log("Connected");
//     } else {
//       console.log("Connection Failed");
//     //   connection.end();
//     }
// });

module.exports = pool;
// module.exports = connection;

// module.exports = {
//     HOST: process.env.DB_HOST,
//     USER: process.env.DB_USER,
//     PASSWORD: process.env.DB_PW,
//     DB: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };