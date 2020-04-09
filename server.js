const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use();

app.use (function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    express.static(path.join(__dirname, 'build'));
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);