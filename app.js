const express = require('express');
const app = express();
const index = require('./routes/index');
const port = 3000;

app.use(express.static('public'));

app.use('/', index);



app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});