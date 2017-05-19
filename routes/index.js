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
    option.type='home';
    userDao.login(function(val){
        option.val=val;
        res.json(option);
    })
});

router.get('/shop', function(req, res, next) {
    var option={};
    option.cssList= ['shop.css'];
    option.jsList= ['shop.js'];
    option.type='shop';
    option.val='';
    res.json(option);
});
router.get('/store', function(req, res, next) {
    var option={};
    option.cssList= ['store.css'];
    option.jsList= ['store.js'];
    option.type='store';
    option.val='';
    res.json(option);
});
router.get('/shop-cart', function(req, res, next) {
    var option={};
    option.cssList= ['shop-cart.css'];
    option.jsList= ['shop-cart.js'];
    option.type='shopCart';
    option.val='';
    res.json(option);
})
;router.get('/mine', function(req, res, next) {
    var option={};
    option.cssList= ['mine.css'];
    option.jsList= ['mine.js'];
    option.type='mine';
    option.val='';
    res.json(option);
});
router.get('/search', function(req, res, next) {
    var option={};
    option.cssList= ['search.css'];
    option.jsList= ['search.js'];
    option.type='search';
    option.val='';
    res.json(option);
});
router.get('/shop-production', function(req, res, next) {
    var option={};
    option.cssList= ['shop-production.css'];
    option.jsList= ['shop-production.js'];
    option.type='shop-production';
    option.val='';
    res.json(option);
});
router.get('/production-detail', function(req, res, next) {
    var option={};
    option.cssList= ['production-detail.css'];
    option.jsList= ['production-detail.js'];
    option.type='production-detail';
    option.val='';
    res.json(option);
});
router.get('/sale_1', function(req, res, next) {
    var option={};
    option.cssList= ['sale_1.css'];
    option.jsList= ['sale_1.js'];
    option.type='sale_1';
    option.val='';
    res.json(option);
});
router.get('/sale_2', function(req, res, next) {
    var option={};
    option.cssList= ['sale_2.css'];
    option.jsList= ['sale_2.js'];
    option.type='sale_2';
    option.val='';
    res.json(option);
});
router.get('/sale_3', function(req, res, next) {
    var option={};
    option.cssList= ['sale_3.css'];
    option.jsList= ['sale_3.js'];
    option.type='sale_3';
    option.val='';
    res.json(option);
});
module.exports = router;
