const mysql = require('mysql');

const HOST = 'localhost';
const USER = 'root';
const PW = '';
const NAME = 'dear_habits';

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PW,
    database: NAME,
    port: 3306,
    connectionLimit: 25
});

module.exports = pool;