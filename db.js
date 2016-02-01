/**
 * Created by Suhila ahmed on 1/31/2016.
 */
var mongoose = require('mongoose');


mongoose.connect('mongodb://suhila:123456@ds035385.mongolab.com:35385/user');

module.exports=mongoose.connection;
