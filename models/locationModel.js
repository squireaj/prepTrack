//                  //
//  LOCATION MODEL  //
//                  //

var mongoose = require('mongoose');
var foodItem = require('./objectModel');


var locationSchema = new mongoose.Schema({
	"owner": String,
	"locationTitle": String,
	"objects": [{
	"owner": String,
	"location": String,
	"category": String,
	"title" : String,
	"calories": Number,
	"protein" : Number,
	"carbs" : Number,
	"fat" : Number,
	"count" : Number,
	"exDate": {type: Date }
}],
	"calories": Number,
	"protein" : Number,
	"carbs" : Number,
	"subLocations": [] 
});

module.exports = mongoose.model('Location', locationSchema);



      