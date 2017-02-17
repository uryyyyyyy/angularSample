const express = require('express');
const app = express();

app.get('/api/count', (req, res) => {
  res.contentType('application/json');
  res.header("Access-Control-Allow-Origin", "*");
  const obj = {"num": 100};
  setTimeout(() => res.json(obj), 1000);
  //res.status(400).json(obj); //for error testing
});


// CORSを許可する
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(9000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server start at port 9000")
});