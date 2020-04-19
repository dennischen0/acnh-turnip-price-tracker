var express = require('express');
var router = express.Router();
import { createConnection, getRepository, getConnection } from "typeorm";
import {Entry} from "../entity/Entry";
const checkJwt = require('../utils/auth0_middleware')

/* GET users listing. */
router.post('/', checkJwt, async function(req, res, next) {
  let entry = await Entry.findOne({ userID: req.user.sub });
  if(!entry) {
    entry = new Entry();
  }
  entry.userID = req.user.sub;
  entry.buyPrice = getValue('buyPrice', req.body);
  entry.monAM = getValueFromDay('monday', 'AM', req.body);
  entry.monPM = getValueFromDay('monday', 'PM', req.body);
  entry.tueAM = getValueFromDay('tuesday', 'AM', req.body);
  entry.tuePM = getValueFromDay('tuesday', 'PM', req.body);
  entry.wedAM = getValueFromDay('wednesday', 'AM', req.body);
  entry.wedPM = getValueFromDay('wednesday', 'PM', req.body);
  entry.thuAM = getValueFromDay('thursday', 'AM', req.body);
  entry.thuPM = getValueFromDay('thursday', 'PM', req.body);
  entry.friAM = getValueFromDay('friday', 'AM', req.body);
  entry.friPM = getValueFromDay('friday', 'PM', req.body);
  entry.satAM = getValueFromDay('saturday', 'AM', req.body);
  entry.satPM = getValueFromDay('friday', 'PM', req.body);

  await entry.save();

  res.status(200).json('success');
});

router.get('/', checkJwt, async function(req, res, next) {
  let entry = await Entry.findOne({ userID: req.user.sub });
  if(!entry) {
    res.status(404).json('Not Found');
  }

  const data = {
    buyPrice: entry.buyPrice,
    Monday: {
      AM: entry.monAM,
      PM: entry.monPM
    },
    Tuesday: {
      AM: entry.tueAM,
      PM: entry.tuePM
    },
    Wednesday: {
      AM: entry.wedAM,
      PM: entry.wedPM
    },
    Thursday: {
      AM: entry.thuAM,
      PM: entry.thuPM
    },
    Friday: {
      AM: entry.friAM,
      PM: entry.friPM
    },
    Saturday: {
      AM: entry.satAM,
      PM: entry.satPM
    },
  };

  res.status(200).json(data);
});

function getValueFromDay(day, time, data){
  let dayData = getValue(day, data);
  return dayData == 0 ? dayData : getValue(time, dayData);
}

function getValue(key, data) {
  return data.hasOwnProperty(key) ? data[key] : 0;
}

module.exports = router;