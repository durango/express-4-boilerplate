var path      = require('path');
var utils     = require('../utils');
var Sequelize = require('sequelize');
var config    = require(path.join(__dirname, '..', 'config.json'));
var db        = {};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  host: config.db.host,
  port: config.db.port
});

utils.bootstrap(__dirname).forEach(load);

function load(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
}

Object.keys(db).forEach(function (modelName) {
  if (typeof db[modelName].associate === "function")
    db[modelName].associate(db);
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
