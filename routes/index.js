var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var dbconfig = require('../config/db_config');

var dbOption = dbconfig;
var conn = mysql.createConnection(dbOption);
conn.query('USE ' + dbconfig.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//회원가입
app.post('/register', function(req, res){
    let userid = req.body.userid || req.query.userid;
    let passwd = req.body.passwd || req.query.passwd;
    let param = [userid, passwd];

    conn.query(`INSERT INTO user_table(userid, password) VALUES (?, ?);`, param, function(error, results, fields){
        if(error) {
            console.log(error);
        }
        res.json({
            "code": 200,
            "user": {
              "userid": userid,
              "passwd": passwd
            }
        });
    });
});


//로그인
app.post('/login', function(req, res){
    let userid = req.body.userid || req.query.userid;
    let passwd = req.body.passwd || req.query.passwd;

    conn.query(`select * from user_table where userid = ?`, [userid], function(error, results, fields){
        if(error){
            console.log(error);
        }
        if(!results[0]){
          console.log("아이디 틀림");
        }
        else {
          if(passwd == results[0]['password']){
            console.log("로그인 성공");
          }
          else {
            console.log("비밀번호 틀림");
          }
        }
    });
});


//info add
app.post('/infoadd', (req, res) => {

    let userid = req.get('userid') || req.body.userid;
    let user_score = req.body.user_score || req.query.user_score;
    let user_kill =  req.body.user_kill || req.query.user_kill;


    let param = [userid, user_score, user_kill];

    if(userid && user_score && user_kill){
      console.log(userid, user_score, user_kill);

      conn.query(`INSERT INTO info_table(userid, user_score, user_kill) VALUES ('${userid}', ${user_score}, ${user_kill});`,
        function(error, results, fields){
          if(error) {
            console.log(error);
          }
          res.status(200).json({
            'status': 200,
            'msg': 'success',
            'user': param
          });
        });
    } else {
      res.status(400).json({
            'status': 400,
            'msg': '값이 부족합니다.'
          });
    }
  });
  

  //유저 별 총 스코어
  app.post('/score', function(req, res){

    let userid = req.get('userid') || req.body.userid;

    conn.query(`select SUM(user_score) as 'score' from info_table where userid = ?;`, [userid], 
    function(error, results, fields){
      if(error){
        console.log(error);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        "userid": userid,
        results
      });
    });
  });
  
  
  //유저 별 총 킬 수
  app.post('/user_kill', function(req, res){

    let userid = req.get('userid') || req.body.userid;

    conn.query(`select SUM(user_kill) as 'kill' from info_table where userid = ?;`, [userid], 
    function(error, results, fields){
      if(error){
        console.log(error);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        "userid": userid,
        results
      });
    });
  });






// //모든 정보 찾기
// app.get('/', (req, res) => {
//     conn.query(`select * from user_info`, function(error, results, fields) {
//       if(error) {
//         console.log(error);
//       }
//       return res.json(results);
//     });
// });

module.exports = app;