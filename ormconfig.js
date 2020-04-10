
require('dotenv').config();

module.exports = {
  "type": "mysql",
  "host": process.env.MYSQL_HOST,
  "port": process.env.MYSQL_PORT,
  "username": process.env.MYSQL_USERNAME,
  "password": process.env.MYSQL_PASSWORD,
  "database": process.env.MYSQL_DATABASE,
  "synchronize": true,
  "logging": false,
  "entities": [
    "server/entity/**/*.ts",
    "server/migration/**/*.ts",
    "server/subscriber/**/*.ts"
  ]
}