const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '8.130.39.153',
    user: 'root',
    password: 'Hedaye123',
    database: 'yiwuzhi',
    waitForConnections: true,
    connectionLimit: 10
})
module.exports = pool;