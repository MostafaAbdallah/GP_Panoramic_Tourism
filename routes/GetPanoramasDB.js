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
var Cityim=[];
var Buildingim=[];
var Museumim=[];
var Otherim=[];

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
          //  console.log("countries hhhhhgh  "  + rows.length);
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

           var post= {CityID : rows2[i].CityID};
            var city = {
                CityID: rows2[i].CityID,
                Name: rows2[i].Name,
                CountryID: rows2[i].CountryID,
            }

            var SelectCityImage = connection.query('Select * from city_image where  ? ',post, function (err, rows3) {

             Cityim.push(rows3[0].ImagePath) ;

            });
            citeis.push(city);
        }

    });

//============================================ select museums =======================================\\

    var SelectMuseum = connection.query('Select * from museum ', function (err, rows) {
        if (err) throw err;

        //  req.session.museum=rows;
        for (var i = 0; i < rows.length; i++) {


            var post2 = {MuseumID: rows[i].MuseumID};

            var obj2 = rows[i];
            var Museum = {
                MuseumID: obj2.MuseumID,
                Name: obj2.Name,
                CountryID: obj2.CountryID,
            }
            var SelectCityImage = connection.query('Select * from museum_image where ? ', post2, function (err, rows5) {
             Museumim.push(rows5[0].ImagePath);
            });
            museums.push(Museum);
        }

    });

//============================================ select buildings =======================================\\

    var SelectBuilding = connection.query('Select * from building ', function (err, rows) {
        if (err) throw err;


        for (var i = 0; i < rows.length; i++) {

            var post3 = {BuildingID: rows[i].BuildingID};

            var Building = {
                BuildingID: rows[i].BuildingID,
                Name: rows[i].Name,
                CountryID: rows[i].CountryID,
            }


            var SelectCityImage = connection.query('Select * from building_image where ? ', post3, function (err, rows6) {

                Buildingim.push(rows6[0].ImagePath);
            });



            buildings.push(Building);



        }

    });

//============================================ select others =======================================\\

    var SelectOther = connection.query('Select * from other ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {

            var post5 = {OtherID: rows[i].OtherID};
            var Other = {
                OtherID: rows[i].OtherID,
                Name: rows[i].Name,
                CountryID: rows[i].CountryID}


            var SelectCityImage = connection.query('Select * from other_image where ? ', post5, function (err, rows7) {


                    Otherim.push(rows7[0].ImagePath);



            });

            others.push(Other);
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
console.log(others);
module.exports.Cityimages=Cityim;
module.exports.Buildingsimages=Buildingim;
module.exports.MuseumImages=Museumim;
module.exports.OtherImages=Otherim;
module.exports.images=imgs;