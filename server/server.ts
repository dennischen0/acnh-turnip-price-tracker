// lib/app.ts
import express = require('express');
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

const bodyParser = require('body-parser')
const path = require('path');
const app: express.Application = express();
require('dotenv').config();


createConnection().then(async connection => {

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));




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




