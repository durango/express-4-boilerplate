var express = require('express');
var controller = express.Router();

controller
.get('/', function (res, res) {
  res.send('hello world');
});

module.exports = ['/', controller];
