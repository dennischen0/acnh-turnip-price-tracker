// lib/app.ts
import express = require('express');
import "reflect-metadata";
import { createConnection } from "typeorm";
const cors = require("cors");
const entriesRouter = require('./routes/entries');
const usersRouter = require('./routes/users');
const path = require('path');
const app: express.Application = express();
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
 
require('dotenv').config();

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;
const appPort = process.env.NODE_ENV === 'production' ? port : 3000;

createConnection().then(async connection => {
  console.log("Here you can setup and run express/koa/any other framework.");
}).catch(error => console.log(error));

app.use(cors({origin: `http://localhost:${appPort}`}));

app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production' && (req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else{
    next();
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(bearerToken());
app.use('/api/entries', entriesRouter);
app.use('/api/users', usersRouter);

// Leave this at the end of the file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));




