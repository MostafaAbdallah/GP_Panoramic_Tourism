var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var UserSchema=require('../schemas/user');
var session = require('express-session');

var futures = require('futures');
var sequence = futures.sequence();


var countries= [];
var citeis= [];
var buildings= [];
var museums= [];
var others= [];
var imgs= [];

var LoadPanoramas = function () {

    var result = 0;
    var mysql;
    var connection;
    /////===================================================\\\\\\


    mysql = require('mysql');
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'panorama'
    });
    connection.connect(function (err) {
    if (!err) {
    console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }

});



    //============================================ select countires =======================================\\


  /*  req.session.cities = [];
    req.session.museum = [];
    req.session.buildings = [];
    req.session.countries = [];
    req.session.others = [];*/

    var SelectCountries = connection.query('Select * from country ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows.length; i++) {
            var obj = new Object()
            obj = rows[i];
            //if(countries)
            countries.push(obj);
            console.log("countries hhhhhgh  "  + rows.length);
        }


    });
    /*console.log("SelectCountries " + SelectCountries);
    console.log("inside the class " + req.session.countries);*/

    // console.log(countries);
//============================================ select cities =======================================\\

  var SelectCity = connection.query('Select * from city ', function (err, rows2) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows2.length; i++) {
           citeis.push(rows2[i]);

        }

        // req.session.cities=rows;

    });

//============================================ select museums =======================================\\

    var SelectMuseum = connection.query('Select * from museum ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        //  req.session.museum=rows;
        for (var i = 0; i < rows.length; i++) {
            museums.push(rows[i]);

        }


    });

//============================================ select buildings =======================================\\

    var SelectBuilding = connection.query('Select * from building ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows.length; i++) {
           buildings.push(rows[i]);

        }

//        req.session.buildings=rows;

    });
//============================================ select others =======================================\\

    var SelectOther = connection.query('Select * from other ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {
           others.push(rows[i]);

        }

        //req.session.others=rows;

    });




}


/*var wait = function(next){
    console.log( req.session.countries);
    console.log("Waiting...");
   // next(null, 2);

}*/
var loadImages=function(){
    var folder = "./public/images/panoramas";

    fs.readdir(folder, function(err, items) {
       // console.log(items);

        for (var i=0; i<items.length; i++) {
            imgs.push("/images/panoramas/"+items[i]);
        }
    });
}

module.exports.Load = LoadPanoramas;
module.exports.LoadImgs = loadImages;

module.exports.countries=countries;
module.exports.cities=citeis;
module.exports.buildings=buildings;
module.exports.museums=museums;
module.exports.others=others;

module.exports.images=imgs;