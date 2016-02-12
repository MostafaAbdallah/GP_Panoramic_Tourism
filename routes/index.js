var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var wait= require('wait.for');
var async = require('async');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

/* GET home page. */
router.get('/', urlencodedParser,function(req, res, next) {

  var loadPanos= require('./GetPanoramasDB');

   loadPanos.Load(req,res);

  res.render('index', {title: 'Home', req: req, res: res});

});

router.post('/',urlencodedParser ,function(req, res, next) {
  delete  req.session.countries;
  var loadPanos= require('./GetPanoramasDB');

  loadPanos.Load(req,res);

  var loginDB = require("./LoginDB");
  var Complete =loginDB.Login(req,res);
//var se=wait.forMethod( loginDB.Login(req,res));
  if(Complete==true) {
    res.render('index', {title: 'Home', req: req, res: res});
  }

});

router.post('/Home', urlencodedParser,function(req, res, next) {
  var loginDB = require("./LoginDB");
  loginDB.Login(req,res);
  // res.render('index', { title: 'Home' });
  res.render('Home', { title: 'Home',req:req,res:res });

});
router.get('/Home', urlencodedParser,function(req, res, next) {

  // res.render('index', { title: 'Home' });
  res.render('Home', { title: 'Home',req:req,res:res });

});

/* GET Sign UP page. */
router.get('/Sign_UP', function(req, res, next) {
  res.render('Sign_UP', { title: 'Sign UP' });

});

router.post('/Hello',urlencodedParser, function(req, res, next) {
  var signDB = require("./SignupDatabase");

  //================================
  signDB.SignUp(req,res);
  console.log(req.body.email);
  // signDB.test2();
  //================================
 // res.render('Hello', { title: 'Hello',req:req,res:res });

});
router.get('/Hello',urlencodedParser, function(req, res, next) {

  // signDB.test2();
  //================================
   res.render('Hello', { title: 'Hello',req:req,res:res });

});



router.post('/routes/SignupDatabase', function(req, res, next) {
  // res.render('Sign_UP', { title: 'Sign UP' });
  res.render('routes/SignupDatabase', { title: 'Sign UP data base',req:req,res:res });

});


/* GET Upload Panoramic View page. */
router.get('/Upload_Panoramic_View', function(req, res, next) {
  res.render('Upload_Panoramic_View', { title: 'Upload Panoramic View' ,req:req,res:res});
});

/* GET View Panoramic Scene page. */
router.get('/View_Panoramic_Scene', function(req, res, next) {
  res.render('View_Panoramic_Scene', { title: 'View Panoramic Scene',req:req,res:res });
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'About', req:req,res:res } );
});

router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login',req:req, res:res });
});
router.get('/ViewCountries', function(req, res, next) {

  //var loadPanos= require('./GetPanoramasDB');
 // loadPanos.Load(req,res);

  res.render('ViewCountries', { title: 'Login',req:req, res:res });
});

router.post('/ViewCountries', function(req, res, next) {

 // var loadPanos= require('./GetPanoramasDB');
 // loadPanos.Load(req,res);

  res.render('ViewCountries', { title: 'Login',req:req, res:res });
});

module.exports = router;
