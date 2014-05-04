var app    = require('./server');
var models = require('./models');

// initialize the controllers
app = require('./controllers')(app);

function loadModels(fn) {
  models.sequelize.sync().complete(fn);
}

function startServer(err) {
  if (err) throw err;

  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Server has started on port ' + port + '.');
}

loadModels(startServer);
