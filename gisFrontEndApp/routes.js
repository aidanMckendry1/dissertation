const express = require("express");
var router = express.Router();

//  below section to be moved to gateway app
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

router.get('/TmpChangeKey.jpg', function(req, res) {
  res.sendFile(__dirname + '/views/TmpChangeKey.jpg');
})

router.get('/WildfireKey.png', function(req, res) {
  res.sendFile(__dirname + '/views/WildfireKey.png');
})

// exports all endpoints in this file
module.exports = router;
