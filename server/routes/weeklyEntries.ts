var express = require('express');
var router = express.Router();
import { getRepository } from "typeorm";
const checkJwt = require('../utils/auth0_middleware')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send({
    res: "success!"
  });
});

module.exports = router;