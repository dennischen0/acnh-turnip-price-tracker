// lib/app.ts
import express = require('express');
import "reflect-metadata";
import { createConnection } from "typeorm";
const cors = require("cors");
const entriesRouter = require('./routes/entries');
const path = require('path');
const app: express.Application = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;

createConnection().then(async connection => {
  console.log("Here you can setup and run express/koa/any other framework.");
}).catch(error => console.log(error));

app.use(cors({origin: `http://localhost:${port}`}));

app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production' && (req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else{
    next();
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use('/api/entries', entriesRouter);

// Leave this at the end of the file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));




