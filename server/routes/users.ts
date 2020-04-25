import {User} from "../entity/User";
var express = require('express');
var router = express.Router();
const checkJwt = require('../utils/auth0_middleware');
var AuthenticationClient = require('auth0').AuthenticationClient;

const auth0 = new AuthenticationClient({
  domain: "dennischen.auth0.com"
});

/* POST user. */
router.post('/', checkJwt, async function(req, res, next) {
  let userID = req.user.sub;
  let profile = await auth0.getProfile(req.token);

  let user = await User.findOne({ userID: userID });
  if(!user) {
    user = new User();
  }
  user.userID = userID;
  user.name = profile.name;

  await user.save();

  res.status(200).json('success');
});

router.get('/:user_id', checkJwt, async function(req, res, next) {
  let userID = req.params.user_id
  if(req.params.user_id !== req.user.sub && req.user.gty !== 'client-credentials') {
    res.status(403).json('Forbidden');
    return;
  }
  let user = await User.findOne({ userID: userID });
  if(!user) {
    res.status(404).json('Not Found');
    return;
  }

  res.status(200).json(user);
})

router.get('/', checkJwt, async function(req, res, next) {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

router.delete('/:user_id', checkJwt, async function(req, res, next) {
  let userID = req.params.user_id;
  if(req.user.gty !== 'client-credentials') {
    res.status(403).json('Forbidden');
    return;
  }
  let user = await User.findOne({ userID: userID });
  if(!user) {
    res.status(404).json('Not Found');
    return;
  }

  user.remove();
  res.status(200).json('deleted');
})

module.exports = router;