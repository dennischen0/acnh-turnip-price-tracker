var express = require('express');
var router = express.Router();
import { createConnection, getRepository } from "typeorm";
import {User} from "../entity/User";
const checkJwt = require('../utils/auth0_middleware')

/* GET users listing. */
router.get('/', checkJwt, async function(req, res, next) {
  const user = await getRepository(User).find();
  res.send({
    user_length: user.length
  });
});

module.exports = router;