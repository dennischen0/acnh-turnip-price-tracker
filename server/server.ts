// lib/app.ts
import express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app: express.Application = express();
require('dotenv').config();

app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'prod' && (req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else{
    next();
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

// Leave this at the end of the file
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);