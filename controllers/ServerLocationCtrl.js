var Location = require('../models/locationModel.js'); 
var User = require('../models/userModel.js');

module.exports = {

  //******************************************************** Create New Location & Add to User

   addLocationToUser: function(req, res) {
    User.findByIdAndUpdate(req.params.User_id, {$push:{locations: req.body}}, {new: true}, function(err, new_location) {
     if (err) {
       return res.status(500).end();
     }
       return res.json(new_location);
     });
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
