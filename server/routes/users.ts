var express = require('express');
var router = express.Router();
import { createConnection, getRepository } from "typeorm";
import {User} from "../entity/User";

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const user = await getRepository(User).find();
  res.send(user.length);
});

module.exports = router;