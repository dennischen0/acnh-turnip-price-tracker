// lib/app.ts
import express = require('express');
import "reflect-metadata";
import { createConnection } from "typeorm";
const cors = require("cors");
const usersRouter = require('./routes/users');
const weeklyEntriesRouter = require('./routes/weeklyEntries');
const path = require('path');
const app: express.Application = express();
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
app.use('/api/users', usersRouter);
app.use('/api/weeklyEntries', weeklyEntriesRouter);

// Leave this at the end of the file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));




