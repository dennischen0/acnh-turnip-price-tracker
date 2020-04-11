'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true
    },
    username: {
      type: 'string',
      length: 50
    },
    password: {
      type: 'string',
      length: 255
    },
  }, function(err) {
    if(err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  db.dropTable('user', callback);
};


exports._meta = {
  "version": 1
};
