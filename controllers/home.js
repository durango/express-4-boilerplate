var express    = require('express');
var controller = express.Router();

controller.route('/')
.get(function (req, res) {
  res.send('Hello World');
});

module.exports = ['/', controller];
