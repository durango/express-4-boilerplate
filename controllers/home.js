var express    = require('express');
var controller = express.Router();

controller.route('/')
.get(function (req, res) {
  res.json(req.user);
});

module.exports = ['/', controller];
