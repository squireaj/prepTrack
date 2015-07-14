var Location = require('../models/locationModel.js'); 
var User = require('../models/userModel.js');
var q = require('q');
module.exports = {

  //******************************************************** Create New Location & Add to User

   addLocationToUser: function(req, res) {
    var deferred = q.defer();
    var newLocation = new Location(req.body);
    newLocation.save(function(err, newLocation) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
       console.log("new Location", newLocation);  
    }).then  //                                                        Here * | 
    (User.findByIdAndUpdate(req.params.User_id, {$push:{locations: window.location._id}}, {new: true}, function(err, new_location) {
     if (err) {
       return res.status(500).end();
     }
       deferred.resolve(res.json(new_location));
     }));
      return deferred.promise;
     },

   //******************************************************** Create New Location 
  createlocation: function(req, res) {
    var newLocation = new Location(req.body);
    // console.log("NewLocation", req.body); 
    newLocation.save(function(err, location) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      return res.json(location);
    });
  },
  //******************************************************** Get All Locations 

  getlocations: function(req, res) {
  Location.find({}).exec().then(function(locations) {
    return res.json(locations);
   });
  },

  //******************************************************** Get One Location 

  getlocation: function(req, res) {
  Location.findOne({_id: req.params._id})
  .populate('Location')
  .exec().then(function(Location) {
    if (!Location) {
      return res.status(404).end();
    }
    return res.json(Location);
    });
  }

}
