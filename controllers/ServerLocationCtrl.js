//                              //
//  SERVER LOCATION CONTROLLER  //
//                              //

var Location = require('../models/locationModel.js'); 
var User = require('../models/userModel.js');

module.exports = {

  //@-@-@-@-@-@-@-@-@-@ - General Location - @-@-@-@-@-@-@-@-@-@

//-- Create New Location

    newLocation: function(req, res){
      var newLocation = new Location(req.body);
      newLocation.save(function(err, location) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
        return res.json(location);
      });
    },

//-- Get All Locations 

    getLocations: function(req, res) {
      Location.find({}).exec().then(function(locations) {
        return res.json(locations);
       });
    },

//-- Get Single Location

    getLocation: function(req, res) {
      Location.findOne({_id: req.params._id})
      .populate('Location')
      .exec().then(function(Location) {
        if (!Location) {
          return res.status(404).end();
        }
        return res.json(Location);
        });
    },

//@-@-@-@-@-@-@-@-@-@ - User Location - @-@-@-@-@-@-@-@-@-@

//-- Add location to user

    pushLocationToUser: function(req, res) {
      User.findByIdAndUpdate(req.params.User_id, {$push:{locations: req.params.Location_id}}, {new: true}, function(err, user) {
       if (err) {
         return res.status(500).end();
       }
        res.status(200).send(user)
       });
      },

//-- Get Users Locations 

    getUsersLocations: function(req, res) {
      User.findOne({_id: req.params.User_id})
      .populate('locations')
      .exec().then(function(user) {
        if(!user) {
          return res.status(404).end();
        }
        return res.json(user);
       });
    }
}












