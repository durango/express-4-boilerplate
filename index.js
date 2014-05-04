var express = require('express');
var server  = require('./server');
var models  = require('./models');
var app     = express();

// initialize the controllers
app = require('./controllers')(app);

function loadModels(fn) {
  models.sequelize.sync({force: true}).complete(fn);
}

function startServer(err) {
  if (err) throw err;

  var port = process.env.PORT || 3000;

  server.use(express.static('./public'));
  server.use('/api', app);
  server.listen(port);

  console.log('Server has started on port ' + port + '.');
}

loadModels(startServer);
