var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var option={};
  //option.cssList= ['login.css'];
  option.jsList= ['login.js'];
  option.cssList= ['shop.css'];
  option.title= 'login';
  option.body= 'Login';
  res.json(option);
});

router.post('/login', function(req, res, next) {
  var option={};
  res.json(option);
});

router.get('/register', function(req, res, next) {
  var option={};
  option.cssList= ['shop.css'];
  option.jsList= ['login.js'];
  option.title='register';
  option.body= 'Register';
  res.json(option);
});

router.post('/register', function(req, res, next) {
  var option={};
  res.json(option);
});

module.exports = router;
