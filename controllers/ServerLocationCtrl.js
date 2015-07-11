var Location = require('../models/locationModel.js'); 

module.exports = {

  createlocation: function(req, res) {
    // console.log(req)
    var newLocation = new Location(req.body);
    console.log("NewLocation", req.body); 
    newLocation.save(function(err, location) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      return res.json(location);
    });
  }

}
