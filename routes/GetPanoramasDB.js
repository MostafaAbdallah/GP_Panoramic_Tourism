var express = require('express');
var bodyParser = require('body-parser');

var UserSchema=require('../schemas/user');
var session = require('express-session');

var futures = require('futures');
var sequence = futures.sequence();


var countries= [];

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

 /*   var SelectCity = connection.query('Select * from city ', function (err, rows2) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows2.length; i++) {
            req.session.cities.push(rows2[i]);

        }

        // req.session.cities=rows;

    });

//============================================ select museums =======================================\\

    var SelectMuseum = connection.query('Select * from museum ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        //  req.session.museum=rows;
        for (var i = 0; i < rows.length; i++) {
            req.session.museum.push(rows[i]);
            console.log(req.session.museum[i]);

        }


    });

//============================================ select buildings =======================================\\

    var SelectBuilding = connection.query('Select * from building ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows.length; i++) {
            req.session.buildings.push(rows[i]);

        }

//        req.session.buildings=rows;

    });
//============================================ select others =======================================\\

    var SelectOther = connection.query('Select * from other ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {
            req.session.others.push(rows[i]);

        }

        //req.session.others=rows;

    });

    req.session.countries = (countries);*/


}


/*var wait = function(next){
    console.log( req.session.countries);
    console.log("Waiting...");
   // next(null, 2);

}*/

module.exports.Load = LoadPanoramas;

module.exports.countries=countries;
