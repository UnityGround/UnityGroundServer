var sql = require('./config/db_sql')();
const express = require('express');
const app = express();
const port = 3000;


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', (req, res) => {
  res.send('이것은 게임 서버입니다.');
});

//#region GET Test
// app.get('/database', (req, res) => {
//     res.send('이것은 베이터베이스 테스트입니다.');
//     sql.select_all(function(err, data){
//         if (err) console.log(err);
//         else console.log(data);
       
//         sql.pool.end(function(err){
//           if (err) console.log(err);
//         });
//       });
//       res.end();
// });
//#endregion

// app.post('/database2', (req, res) => {
//   var nickname = req.body;
//   console.log(uId);
//   res.json({
//     "code":200,
//     "nickname": nickname
//   });
// });


app.post('/nickname', (req, res) => {
  sql.select_nickname(function(err, data){
    if (err) {
      
    }
    else console.log(data);
   
    sql.pool.end(function(err){
      if (err) console.log(err);
    });
  });
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});