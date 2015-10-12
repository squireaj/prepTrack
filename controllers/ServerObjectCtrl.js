//                            //
//  SERVER OBJECT CONTROLLER  //
//                            //

var Location = require('../models/locationModel.js'); 
var User = require('../models/userModel.js')
var Object = require('../models/objectModel.js')

module.exports = {

//@-@-@-@-@-@-@-@-@-@ - Object - @-@-@-@-@-@-@-@-@-@

//-- Create New Object

  newObject: function(req, res) {
	var object = new Object(req.body);
	object.save(function(err, new_object) {
		if (err) {
			console.log("can't create object", err);
		}
		res.json(new_object);
	});
},

//-- Add Object to Location

   addObjectToLocation: function(req, res) {
   	console.log(req.params.Location_id)
	Object.findById(req.body._id).exec().then(function(object){
		console.log(object)
		if(!object){
			console.log("can't find object")
			return res.status(404).end();
		}
		Location.findById({ '_id': req.params.Location_id}).exec().then(function(location){
			console.log(location)
			if(!location){
			console.log("can't find location")
			return res.status(404).end();
		}
			location.objects.push(object);
			location.save(function(err){
				if(err){
					console.log("can't add object to objects")
				}
				return res.json(object)
			})
		})
	})
  }
}


// app.post('/api/users/me/favorite_places', requireAuth, function(req, res) {
// 	//grab the place
// 	Place.findOne({ _id: req.body._id }).exec().then(function(place) {
// 		if (!place) {
// 			return res.status(404).end();
// 		}
// 		//update the user with the favorite_place
// 		User.findOne({ _id: req.user._id }).exec().then(function(user) {
// 			user.favorite_places.push(place);
// 			user.save(function(err) {
// 				if (err) {
// 					console.log("can't add place to user");
// 				}
// 				return res.json(user);
// 			});
// 		});
// 	});
// });