/**
 * Created by Suhila ahmed on 2/10/2016.
 */

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

var Login = function (req,res ,next){

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




    FullName= req.body.Fname;

    Password = req.body.newpassword1;


    var post  = {
        FullName: FullName,

        Password: Password,

    };


    var EmailUser = {Email :Email };
    var querySelectUser = connection.query('Select * from user ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {

           if(rows[i].FullName==FullName||rows[i].Email==FullName){
               if(rows[i].Password==Password){
                   console.log(rows[i]);
                   req.session.user=rows[i];
                   console.log("Session : "+req.session.user.FullName);
                   res.redirect('/');

                   return true;
               }

               else{
                   req.session.ErrorLogin="User name, password or email is Wrong!";
                   res.redirect('/Login');
                   return false;
               }

           }

        };



    });



}

module.exports.Login = Login;