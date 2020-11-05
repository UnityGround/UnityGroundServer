var sql = require('./config/db_sql')();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('이것은 게임 서버입니다.');
});

app.get('/database', (req, res) => {
    res.send('이것은 베이터베이스 테스트입니다.');
    sql.select(function(err, data){
        if (err) console.log(err);
        else console.log(data);
       
        sql.pool.end(function(err){
          if (err) console.log(err);
        });
      });
      res.end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});