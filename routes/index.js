var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });

});

/* GET Sign UP page. */
router.get('/Sign_UP', function(req, res, next) {
  res.render('Sign_UP', { title: 'Sign UP' });

});
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/Hello',urlencodedParser, function(req, res, next) {
  var signDB = require("./SignupDatabase");

  //================================
  signDB.SignUp(req,res);
  console.log(req.body.email);
 // signDB.test2();
  //================================
  res.render('Hello', { title: 'Hello' });

});

router.post('/routes/SignupDatabase', function(req, res, next) {
 // res.render('Sign_UP', { title: 'Sign UP' });
  res.render('routes/SignupDatabase', { title: 'Sign UP data base' });

});


/* GET Upload Panoramic View page. */
router.get('/Upload_Panoramic_View', function(req, res, next) {
  res.render('Upload_Panoramic_View', { title: 'Upload Panoramic View' });
});

/* GET View Panoramic Scene page. */
router.get('/View_Panoramic_Scene', function(req, res, next) {
  res.render('View_Panoramic_Scene', { title: 'View Panoramic Scene' });
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'About' });
});



module.exports = router;
