var express = require('express');
var userDao=require('../dao/userDao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var option={};
  option.cssList= ['home.css'];
  option.jsList= ['home.js'];
  userDao.login(function(val){
    option.val=val;
    res.render('home',option);
  })
});
router.get('/home', function(req, res, next) {
    var option={};
    option.cssList= ['home.css'];
    option.jsList= ['home.js'];
    option.template=
        '<script id="home-template" type="text/x-handlebars-template" class="templateList">'+
        '<div class="entry">'+
        '<h1>{{title}}</h1>'+
        '<div class="body">'+
        '{{body}}'+
        '</div>'+
        '</div>'+
        '</script>';
    userDao.login(function(val){
        option.val=val;
        res.json(option);
    })
});

router.get('/shop', function(req, res, next) {
  var option={};
  option.cssList= ['shop.css'];
  option.jsList= ['shop.js'];
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
router.get('/store', function(req, res, next) {
  var option={};
  option.cssList= ['store.css'];
  option.jsList= ['store.js'];
  option.template=
      '<script id="store-template" type="text/x-handlebars-template" class="templateList">'+
      '<div class="entry">'+
      '<h1>{{title}}</h1>'+
      '<div class="body">'+
      '{{body}}'+
      '</div>'+
      '</div>'+
      '</script>';
  res.json(option);
});
router.get('/shop-cart', function(req, res, next) {
  var option={};
  option.cssList= ['shop-cart.css'];
  option.jsList= ['shop-cart.js'];
  option.template=
      '<script id="shop-cart-template" type="text/x-handlebars-template" class="templateList">'+
      '<div class="entry">'+
      '<h1>{{title}}</h1>'+
      '<div class="body">'+
      '{{body}}'+
      '</div>'+
      '</div>'+
      '</script>';
  res.json(option);
})
;router.get('/mine', function(req, res, next) {
  var option={};
  option.cssList= ['mine.css'];
  option.jsList= ['mine.js'];
  option.template=
      '<script id="mine-template" type="text/x-handlebars-template" class="templateList">'+
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
