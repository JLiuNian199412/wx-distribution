var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var hbs=require('hbs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('.html',require('ejs').__express);
//app.set('view engine', 'html');

app.engine('html', require('hbs').__express);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'12345',
    cookie:{maxAge:3600000},
    resave:false,
    saveUninitialized:true
}))
app.use('/', index);
app.use('/users', users);

hbs.registerHelper('css', function(str, option) {
  var cssList = this.cssList || [];
  str = str.split(/[,，;；]/);
  console.log('css: ',str);
  str.forEach(function (item) {
    if(cssList.indexOf(item)<0) {
      cssList.push(item);
    }
  });
  this.cssList = cssList.concat();

});

hbs.registerHelper('js', function(str, option) {
  var jsList = this.jsList || [];
  str = str.split(/[,，;；]/);
  console.log('js: ',str);
  str.forEach(function (item) {
    if(jsList.indexOf(item)<0) {
      jsList.push(item);
    }
  });
  this.jsList = jsList.concat();
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
