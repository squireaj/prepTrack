var mongoose = require('mongoose');
var foodItem = require('./objectModel');


var locationSchema = new mongoose.Schema({
	"owner": String,
	"locationTitle": String,
	"objects": [],
	"userId" : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	// "subLocations": [newLocation] 
});

module.exports = mongoose.model('Location', locationSchema);
