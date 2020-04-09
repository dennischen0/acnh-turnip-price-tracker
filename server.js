const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


app.use(function(req, res, next) {
  if ((req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else
  
    express.static(path.join(__dirname, 'build'));
    next();
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);