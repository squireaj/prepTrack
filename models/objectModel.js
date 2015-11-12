//                //
//  OBJECT MODEL  //
//                //

var mongoose = require('mongoose');

var objectSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Object', objectSchema);

