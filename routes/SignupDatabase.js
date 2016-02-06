/**
 * Created by Suhila ahmed on 2/5/2016.
 */
var db = require('./db');
var express = require('express');
var session=require('client-sessions');
var router = express.Router();

var FullName ;
var Email ;
var BirthDate ;
var Password ;
var PhoneNumber ;
var FacebookAcc ;
var FlickerAcc ;
var imagePath;

module.exports = function Test(){

    alert("Hello");
}
router.post('/routes/SignupDatabase', function(req, res, next) {

    res.render('routes/SignupDatabase', { title: 'Sign UP data base' });
    var day= req.param('day');
    var month= req.param('month');
    var year= req.param('year');
    var birth= year+'-'+month+'-'+day;

      FullName= req.param ('Fname');
      Email = req.param('email');
      Password = req.param('newpassword1');
      PhoneNumber = req.param('mobile');
      FacebookAcc = req.param('Face');
      FlickerAcc = req.param('flickr');
      BirthDate = new Date(birth);
     imagePath = req.param('Upload').value;

    req.session.email='Emailsession';
    console.log(req.session.email);
    res.redirect('home');
    var post  = {
        FullName: FullName,
        Email: Email,
        BirthDate: BirthDate,
        Password: Password,
        PhoneNumber : PhoneNumber,
        FacebookAcc :FacebookAcc,
        FlickerAcc : FlickerAcc,
        ImagePath : imagePath
    };
    var query = connection.query('INSERT INTO user SET ?', post, function(err, result) {
        // Neat!
    });

 });

console.log(query.sql);
