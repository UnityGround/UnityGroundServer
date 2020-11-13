const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password123@',
  database : 'UnityGround'
});

module.exports = conn;