var mongoose = require('mongoose');
var foodItem = require('./objectModel');


var locationSchema = new mongoose.Schema({
	"owner": String,
	"locationTitle": String,
	"objects": [],
	"subLocations": [] 
});

module.exports = mongoose.model('Location', locationSchema);



      