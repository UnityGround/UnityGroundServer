const express = require('express');
const app = require('./routes/index');
const port = 3000;


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});