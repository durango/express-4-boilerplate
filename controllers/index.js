var path  = require('path');
var utils = require('../utils');

/**
 * Bootstraps all of the files in /controllers then attaches
 * the controller to the application.
 *
 * @param  {Object} app Express object
 * @return {Object}     Returns modified app
 * @api public
 */

function loadControllers(app) {
  utils.bootstrap(__dirname).forEach(load);

  function load(file) {
    var ctrl      = require(path.join(__dirname, file));
    var isObject  = typeof ctrl === "object" && ctrl !== null;

    if (Array.isArray(ctrl))
      app.use(ctrl[0], ctrl[1]);
    else if (isObject)
      app.use(ctrl.path, ctrl.controller);
    else
      app.use('/', ctrl);
  }

  return app;
}

module.exports = loadControllers;
