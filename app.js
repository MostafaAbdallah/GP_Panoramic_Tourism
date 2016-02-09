var Kinect2 = require('kinect2');
var express = require('express');
var session = require('express-session');
var path = require('path');
var validator = require('express-validator');

var routes = require('./routes/index');
var db= require('./db');
var kinect = new Kinect2();

var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
var db = require('./db');

app.use(session({
  secret: 'Session',
  //name: cookie_name,
 // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

if(kinect.open()) {
  server.listen(8000);
  console.log('Server listening on port 3000');
  console.log('Point your browser to http://localhost:8000');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', routes);

  kinect.on('bodyFrame', function(bodyFrame){
    io.sockets.emit('bodyFrame', bodyFrame);
  });

  kinect.openBodyReader();
}

module.exports = app;
