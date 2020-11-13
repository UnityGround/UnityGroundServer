const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const conn = require('../config/db_config');
const User = require('../model/info');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//회원가입
app.post('/register', function(req, res){
    let userid = req.body.userid || req.query.userid;
    let passwd = req.body.passwd || req.query.passwd;

    conn.query(`insert`, function(error, results, fields){
        if(error) {
            console.log(error);
        }
        res.json({
            //성공 메시지
        });
    });
});

//로그인
app.post('/login', function(req, res){
    let userid = req.body.userid || req.query.userid;
    let passwd = req.body.passwd || req.query.passwd;

    conn.query(`아이디 찾기`, function(error, results, fields){
        if(error){
            console.log(error);
        }
        else {
            conn.query(`비밀번호 찾기`, function(error, results, fields){
                if(error){
                    console.log(error);
                }
                res.json({
                    //성공 메세지
                });
            });
        }
    });
});




//info add
app.post('/infoadd', (req, res) => {

    let score = User.score = req.body.score || req.query.score;
    let user_kill = User.user_kill = req.body.user_kill || req.query.user_kill;
    let time_user = User.time_user = req.body.time_user || req.query.time_user;
    console.log(User);
  
    if(score && user_kill) {
      conn.query(`INSERT INTO user_info(score, user_kill, time_user) VALUES (${score}, ${user_kill}, ${time_user});`,
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
      res.status(400).json({
            'status': 400,
            'msg': '값이 부족합니다.'
          });
    }
  });
  

  //총 스코어
  app.get('/score', function(req, res){
    conn.query(`select SUM(score) as '총 스코어' from user_info;`, 
    function(error, results, fields){
      if(error){
        console.log(error);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        "총 스코어": results
      });
    });
  });
  
  
  //총 스코어
  app.get('/user_kill', function(req, res){
    conn.query(`select SUM(user_kill) as '총 킬' from user_info;`, 
    function(error, results, fields){
      if(error){
        console.log(error);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        "총 킬": results
      });
    });
  });






//모든 정보 찾기
app.get('/', (req, res) => {
    conn.query(`select * from user_info`, function(error, results, fields) {
      if(error) {
        console.log(error);
      }
      return res.json(results);
    });
});

// 헤더 값 받아오기
app.post('/head', function(req, res){
    let userid = req.get('userid');
    console.log(userid);
});

module.exports = app;