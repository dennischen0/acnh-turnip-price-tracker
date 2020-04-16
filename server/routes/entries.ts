var express = require('express');
var router = express.Router();
import { createConnection, getRepository, getConnection } from "typeorm";
import {Entry} from "../entity/Entry";
const checkJwt = require('../utils/auth0_middleware')

/* GET users listing. */
router.post('/', checkJwt, async function(req, res, next) {
  console.log(req.user);
  console.log(req.body);

  let entry = await Entry.findOne({ userID: req.user.sub });
  if(!entry) {
    entry = new Entry();
  }
  entry.userID = req.user.sub;
  entry.buyPrice = getValue('buyPrice', req.body);
  entry.monAM = getValueFromDay('Monday', 'AM', req.body);
  entry.monPM = getValueFromDay('Monday', 'PM', req.body);
  entry.tueAM = getValueFromDay('Tuesday', 'AM', req.body);
  entry.tuePM = getValueFromDay('Tuesday', 'PM', req.body);
  entry.wedAM = getValueFromDay('Wednesday', 'AM', req.body);
  entry.wedPM = getValueFromDay('Wednesday', 'PM', req.body);
  entry.thuAM = getValueFromDay('Thursday', 'AM', req.body);
  entry.thuPM = getValueFromDay('Thursday', 'PM', req.body);
  entry.friAM = getValueFromDay('Friday', 'AM', req.body);
  entry.friPM = getValueFromDay('Friday', 'PM', req.body);
  entry.satAM = getValueFromDay('Saturday', 'AM', req.body);
  entry.satPM = getValueFromDay('Saturday', 'PM', req.body);
  await getConnection().manager.save(entry);


  res.send({});
});

function getValueFromDay(day, time, data){
  let dayData = getValue(day, data);
  return dayData == 0 ? dayData : getValue(time, dayData);
}

function getValue(key, data) {
  return data.hasOwnProperty(key) ? data[key] : 0;
}

module.exports = router;