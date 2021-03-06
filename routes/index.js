var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var wait= require('wait.for');
var async = require('async');

var futures = require('futures');
var sequence = futures.sequence();
var loadPanos= require('./GetPanoramasDB');

 loadPanos.Load();
var CityImages=loadPanos.Cityimages;
var BuildingImages=loadPanos.Buildingsimages;
var MuseumsImages=loadPanos.MuseumImages;
var OtherImages = loadPanos.OtherImages;
console.log(BuildingImages)
var co = loadPanos.countries;
var ci = loadPanos.cities;
var bl = loadPanos.buildings;
var mu = loadPanos.museums;
var oth = loadPanos.others;

loadPanos.LoadImgs();
var images = loadPanos.images;
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

/* GET home page. */
router.get('/', urlencodedParser,function(req, res) {
 // var loadPanos= require('./GetPanoramasDB');

  //console.log("Here Database call" + co);
        //req.session.countries = app.countries;

     /*   req.session.cities = [];
        req.session.museum = [];
        req.session.buildings = [];
        req.session.others = [];*/
    for( var i=0;i<ci.length;i++){
        ci[i].ImagePath=CityImages[i];
    }
    for( var i=0;i<bl.length;i++){
        bl[i].ImagePath=BuildingImages[i];
    }
    for( var i=0;i<mu.length;i++){
        mu[i].ImagePath=MuseumsImages[i];
    }
    for( var i=0;i<oth.length;i++){
        oth[i].ImagePath=OtherImages[i];
    }

         req.session.countries = co;
         req.session.Cities=ci;
         req.session.buildings=bl;
         req.session.museums=mu;
         req.session.other=oth;
    //console.log("Here The Coun" + req.session.countries[2]);
    //  console.log(images);
    res.render('index', {title: 'Home', req: req, res: res , Countries:loadPanos.countries});

});

router.post('/',urlencodedParser ,function(req, res, next) {
  /*delete  req.session.countries;
  var loadPanos= require('./GetPanoramasDB');

  loadPanos.Load(req,res);*/

  var loginDB = require("./LoginDB");
  var Complete =loginDB.Login(req,res);
//var se=wait.forMethod( loginDB.Login(req,res));
  if(Complete==true) {
    res.render('index', {title: 'Home', req: req, res: res});
  }

});


/*
router.post('/Home', urlencodedParser,function(req, res, next) {
  var loginDB = require("./LoginDB");
  loginDB.Login(req,res);
  // res.render('index', { title: 'Home' });
  res.render('Home', { title: 'Home',req:req,res:res });

});
router.get('/Home', urlencodedParser,function(req, res, next) {

  // res.render('index', { title: 'Home' });
  res.render('Home', { title: 'Home',req:req,res:res });

});*/

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
router.get('/View_Panoramic_Scene',urlencodedParser, function(req, res, next) {

  res.render('View_Panoramic_Scene', { title: 'View Panoramic Scene',req:req,res:res , Images:images});
});
router.post('/View_Panoramic_Scene',urlencodedParser ,function(req, res, next) {

    res.render('View_Panoramic_Scene', { title: 'View Panoramic Scene',req:req,res:res , Images:images});
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'About', req:req,res:res } );
});

router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login',req:req, res:res });
});
router.get('/ViewCountries', function(req, res, next) {
  /*var loadPanos= require('./GetPanoramasDB');

      loadPanos.Load(req,res);
  req.session.countries = [];
  req.session.countries = loadPanos.countries;*/
  req.session.countries = co;
      res.render('ViewCountries', { title: 'Login',req:req, res:res});
});

router.post('/ViewCountries', function(req, res, next) {

  var loadPanos= require('./GetPanoramasDB');
   loadPanos.Load(req,res);

  res.render('ViewCountries', { title: 'Login',req:req, res:res ,Countries:loadPanos.countries});
});

module.exports = router;
