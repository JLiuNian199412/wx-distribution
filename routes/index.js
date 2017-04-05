var express = require('express');
var userDao=require('../dao/userDao')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  userDao.login(function(val){
    res.render('home',{val:val,cssList: ['/css/home.css', '/css/home_add.css'],jsList: ['/js/home.js']});
  })
});
router.get('/index2', function(req, res, next) {
  res.render('shop', { title: 'Express' });
});
router.get('/index3', function(req, res, next) {
  res.render('store', { title: 'Express' });
});
router.get('/index4', function(req, res, next) {
  res.render('shop-cart', { title: 'Express' });
})
;router.get('/index5', function(req, res, next) {
  res.render('mine', { title: 'Express' });
});
module.exports = router;
