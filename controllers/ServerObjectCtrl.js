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
  },

  //-- Remove Object from Location

  removeObjectFromLocation: function(req, res){
  	console.log(req.params.Object_id, req.params.Location_id)
  	Object.remove({ _id: req.params.Object_id}, function(err){
  		if(err){
  			console.log("can't delete object", err);
  		}
  		res.status(200);
  		}),
  	Location.findByIdAndUpdate(req.params.Location_id, {$pull: {objects: req.params.Object_id}}, function(err, user){
  		if(err) {
  			return res.status(500).end()
  		}
  		res.status(200).send(user)
  	});
  }
}






































