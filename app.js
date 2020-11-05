const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password123@',
  database : 'UnityGround'
});
const cors = require('cors');
let User = require('./model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  conn.query(`select * from User`, function(error, results, fields) {
    if(error) {
      console.log(error);
    }
    return res.json(results);
  });
});

app.post('/user/add', (req, res) => {
  User.nickname = req.body.nickname;
  User.age = req.body.age;
  User.kill = req.body.kill;
  console.log(User);

  if(User.nickname && User.age && User.kill) {
    conn.query(`INSERT INTO User VALUES ("${User.nickname }", ${User.age}, ${User.kill})`,
      function(error, results, fields){
        if(error) {
          console.log(error);
        }
        res.status(200).json({
          'status': 200,
          'msg': 'success',
          'user': User
        });
      });
  } else {
    //값이 다 들어오지 않은 경우
  }
});

app.get('/rank', (req, res) => {
  conn.query(`select Nickname, sum(user_kill) as 'aa' from User group by Nickname order by aa DESC, nickname ASC;`, function(error, results, fields) {
    if(error) {
      console.log(error);
    }
    return res.json(results);
  });
});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});