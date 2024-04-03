const mysql = require('mysql');

const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'root';
const PW = process.env.DB_PW || '';
const NAME = process.env.DB_NAME || 'dear_habits';

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PW,
    database: NAME,
    port: 3306,
    connectionLimit: 25
});

module.exports = pool;