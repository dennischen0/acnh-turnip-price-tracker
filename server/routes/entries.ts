var express = require('express');
var router = express.Router();
import { Entry } from "../entity/Entry";
import { User } from "../entity/User";
import { Not } from "typeorm";
const checkJwt = require('../utils/auth0_middleware')

/* POST entry listing. */
router.post('/', checkJwt, async function(req, res, next) {
  let userID = req.user.sub;
  let user = await User.findOne({userID: userID});
  let entry = await Entry.findOne({ user: user });
  if(!entry) {
    entry = new Entry();
  }
  entry.user = user;
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

/* GET entry. */
router.get('/:user_id', checkJwt, async function(req, res, next) {
  if(req.params.user_id !== req.user.sub && req.user.gty !== 'client-credentials') {
    res.status(403).json('Forbidden');
    return;
  }
  let userID = req.params.user_id
  let user = await User.findOne({userID: userID}, { relations: ["entries"] });
  if(!user.entries[0]) {
    res.status(404).json('Not Found');
    return;
  }
  let result = beautify(user);
  res.status(200).json(result);
})

/* GET all entries. */
router.get('/', checkJwt, async function(req, res, next) {
  let users = await User.find({ relations: ["entries"] });
  const result = users.map(user => beautify(user))
  console.log(result)
  res.status(200).json(result);
});

/* DELETE entries. */
router.delete('/:user_id', checkJwt, async function(req, res, next) {
  let userID = req.params.user_id;
  if(req.user.gty !== 'client-credentials') {
    res.status(403).json('Forbidden');
    return;
  }
  let user = await User.findOne({userID: userID});
  let entry = await Entry.findOne({ user: user });
  if(!entry) {
    res.status(404).json('Not Found');
    return;
  }

  entry.remove();
  res.status(200).json('deleted');
})



function getValueFromDay(day, time, data){
  let dayData = getValue(day, data);
  return dayData == 0 ? dayData : getValue(time, dayData);
}

function getValue(key, data) {
  return data.hasOwnProperty(key) ? data[key] : 0;
}

function beautify(user) {
  let entry = user.entries[0];
  const data = {
    userName: user.name,
    buyPrice: entry.buyPrice,
    monday: {
      AM: entry.monAM,
      PM: entry.monPM
    },
    tuesday: {
      AM: entry.tueAM,
      PM: entry.tuePM
    },
    wednesday: {
      AM: entry.wedAM,
      PM: entry.wedPM
    },
    thursday: {
      AM: entry.thuAM,
      PM: entry.thuPM
    },
    friday: {
      AM: entry.friAM,
      PM: entry.friPM
    },
    saturday: {
      AM: entry.satAM,
      PM: entry.satPM
    },
  };
  return data;
}

module.exports = router;