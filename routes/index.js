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
          res.status(200).json({
            'status': 400,
            'msg': '아이디 불일치'
          });
        }
        else {
          if(passwd == results[0]['password']){
            res.status(200).json({
              'status': 200,
              'msg': 'success',
              'user': results
            });
          }
          else {
            res.status(200).json({
              'status': 400,
              'msg': '비밀번호 불일치'
            });
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



//유저 별 순위 (스코어)
app.get('/user_rank_score', function(req, res){
  conn.query(`select userid, SUM(user_score) as 'user_score' from info_table group by userid order by user_score DESC, userid ASC`,
  function(error, results, fields){
    if(error){
      console.log(error);
    }
    conn.query(`select COUNT(DISTINCT userid) as 'count' from info_table;`, function(err, rows, fields){
      if(err){
        console.log(err);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        'count': rows[0].count,
        results
      });
    });
  });
});

//유저 별 순위 (킬)
app.get('/user_rank_kill', function(req, res){
  conn.query(`select userid, SUM(user_kill) as 'user_kill' from info_table group by userid order by user_score DESC, userid ASC`, 
  function(error, results, fields){
    if(error){
      console.log(error);
    }
    conn.query(`select COUNT(DISTINCT userid) as 'count' from info_table;`, function(err, rows, fields){
      if(err){
        console.log(err);
      }
      res.status(200).json({
        "code": 200,
        'msg': 'success',
        'count': rows[0].count,
        results
      });
    });
  });
});

module.exports = app;