var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compress = require('compression');
var Sequelize = require('sequelize');
var config = require('./config.json');
var app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: 'secret', key: 'sid', cookie: { secure: false }
}));
app.use(methodOverride());
app.use(csrf());
app.use(compress());

// load controllers
function loadControllers(err, models) {
  if (err) throw new Error(err)
  var routes = fs.readdirSync(path.join(__dirname, 'controllers'));
  routes.forEach(function (routePath) {
    var route = require(path.join(__dirname, 'controllers', routePath));
    app.use(route[0], route[1]);
  });

  startServer();
}

// load models
function loadModels(fn) {
  var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port
  });

  sequelize.authenticate().complete(importModels);

  function importModels(err) {
    if (err) return fn(err);
    var files  = fs.readdirSync(path.join(__dirname, 'models'));
    var models = {};

    files.forEach(function (modelPath) {
      models[modelPath.replace(/\.js$/i, '')] = sequelize.import(path.join(__dirname, 'models', modelPath));
    })

    fn(null, models);
  }
}

function bootstrap() {
  loadModels(loadControllers);
}

function startServer() {
  app.listen(3000);
  console.log('Server has started.');
}

bootstrap();
