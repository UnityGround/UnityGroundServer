const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('이것은 게임 서버입니다.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});