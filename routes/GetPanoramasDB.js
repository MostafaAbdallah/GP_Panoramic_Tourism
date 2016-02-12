var express = require('express');
var bodyParser = require('body-parser');

var UserSchema=require('../schemas/user');
var session = require('express-session');


var countries=[];

var LoadPanoramas = function (req,res ,callback){
   var result= 0;

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

//============================================ select countires =======================================\\


    req.session.cities=[];
    req.session.museum=new Array;
    req.session.buildings=new Array;
    req.session.others=new Array;
    req.session.countries =[];

    var SelectCountries = connection.query('Select * from country ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');

        for(var i=0;i<rows.length;i++){
          var obj = new Object()
            obj=rows[i];

            countries.push(obj);

        }




});

   console.log(req.session.countries);

   // console.log(countries);
//============================================ select cities =======================================\\

    var SelectCountries = connection.query('Select * from city ', function(err,rows2){
        if(err) throw err;

        console.log('Data received from Db:\n');
        for(var i=0;i<rows2.length;i++){
            req.session.cities.push(rows2[i]);

        }

       // req.session.cities=rows;

    });

//============================================ select museums =======================================\\

    var SelectCountries = connection.query('Select * from museum ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');

      //  req.session.museum=rows;
        for(var i=0;i<rows.length;i++){
            req.session.museum.push(rows[i]);
            console.log(req.session.museum[i]);

        }


    });

//============================================ select buildings =======================================\\

    var SelectCountries = connection.query('Select * from building ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');
        for(var i=0;i<rows.length;i++){
            req.session.buildings.push(rows[i]);

        }

//        req.session.buildings=rows;

    });
//============================================ select others =======================================\\

    var SelectCountries = connection.query('Select * from other ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');

        for(var i=0;i<rows.length;i++){
            req.session.others.push(rows[i]);

        }

        //req.session.others=rows;

    });


  /*  for(var i=0;i<countries.length;i++){

        console.log(countries[i]);

    }*/
     req.session.countries=(countries);
    console.log( req.session.countries);
    // res.redirect("/");
    //res.render('index', { title: 'Home', req:req,res:res });


}


var wait=function(){
    console.log("Waiting...");
}
module.exports.Load = LoadPanoramas;
module.exports.wait=wait;