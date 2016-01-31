var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Sign UP page. */
router.get('/Sign_UP', function(req, res, next) {
  res.render('Sign_UP', { title: 'Sign UP' });
});

/* GET Upload Panoramic View page. */
router.get('/Upload_Panoramic_View', function(req, res, next) {
  res.render('Upload_Panoramic_View', { title: 'Upload Panoramic View' });
});

/* GET View Panoramic Scene page. */
router.get('/View_Panoramic_Scene', function(req, res, next) {
  res.render('View_Panoramic_Scene', { title: 'View Panoramic Scene' });
});



module.exports = router;
