/**
 * Created by Suhila ahmed on 2/5/2016.
 */

//var db = require('db');
var express = require('express');
var bodyParser = require('body-parser');

var UserSchema=require('../schemas/user');
var session = require('express-session');

var router = express.Router();

var FullName ;
var Email ;
var BirthDate ;
var Password ;
var PhoneNumber ;
var FacebookAcc ;
var FlickerAcc ;
var imagePath;

//===========================

var Test1 = function (){
    console.log("Here");
}

var SignUp = function (req,res){

    res.setHeader("Content-Type", "text/html");

   /////===================================================\\\\\\
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'panorama'
    });

    connection.connect(function(err) {
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });

    ///================================================================\\\\\\


    var day= req.body.day;
    var month= req.body.month;
    var year= req.body.year;
    var birth= year+'-'+month+'-'+day;

  console.log(req.body.day);

    FullName= req.body.Fname;
    Email = req.body.email;
    Password = req.body.newpassword1;
    PhoneNumber = req.body.mobile;
    FacebookAcc = req.body.Face;
    FlickerAcc = req.body.flickr;
    BirthDate = new Date(birth);

   if(req.body.Upload!=""){
       imagePath = '/images/'+req.body.Upload;
   }
    else{
       imagePath='/images/default_profile.png';
   }


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

    var queryInsert = connection.query('INSERT INTO user SET ?', post, function(err, result) {

    });

    var EmailUser = {Email :Email };
    var querySelectUser = connection.query('Select * from user where Email = ?' , Email, function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');
        //console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].FullName);
        };
        var newUser = {
            Id: rows[0].UserID,
            Name: rows[0].FullName,
            Email: rows[0].Email,
            Data: rows[0].BirthDate,
            Pass :rows[0].Password,
            Phone :rows[0].PhoneNumber,
            face :rows[0].FacebookAcc,
            flicker :rows[0].FlickerAcc,
            image : rows[0].ImagePath
        }

        req.session.user=rows[0];
        console.log("Session : "+req.session.user.FullName);
    });

    res.redirect('/');


}

module.exports.SignUp = SignUp;

//==================================

