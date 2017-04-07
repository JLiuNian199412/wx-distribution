var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var option={};
  option.cssList= ['shop.css'];
  option.jsList= ['loginAndRegister.js'];
  option.template=
      '<script id="shop-template" type="text/x-handlebars-template" class="templateList">'+
      '<div class="entry">'+
      '<h1>{{title}}</h1>'+
      '<div class="body">'+
      '{{body}}'+
      '</div>'+
      '</div>'+
      '</script>';
  res.json(option);
});

router.get('/register', function(req, res, next) {
  var option={};
  option.cssList= ['shop.css'];
  option.jsList= ['loginAndRegister.js'];
  option.template=
      '<script id="shop-template" type="text/x-handlebars-template" class="templateList">'+
      '<div class="entry">'+
      '<h1>{{title}}</h1>'+
      '<div class="body">'+
      '{{body}}'+
      '</div>'+
      '</div>'+
      '</script>';
  res.json(option);
});

module.exports = router;
