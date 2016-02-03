var express = require('express');

var path = require('path');
var validator = require('express-validator');
{
  /*var favicon = require('serve-favicon');
   var logger = require('morgan');
   var cookieParser = require('cookie-parser');
   var bodyParser = require('body-parser');*/

}

//-->> To Go to Web Pages Page require the index.js
var routes = require('./routes/index');



var app = express();
var db = require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
{
  // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  /*app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(cookieParser());*/

}
app.use(express.static(path.join(__dirname, 'public')));

// -->> To Route and Display Pages according response of index
app.use('/', routes);

console.log("http://localhost:3000/");
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
