var Location = require('../models/objectModel.js'); 
var User = require('../models/userModel.js')
var objects = require('../models/objectModel.js')

module.exports = {

  //******************************************************** Create New Object and add to Location

   addObjectToLocation: function(req, res) {
    User.findById(req.params.User_id).populate(objects, req.body).exec(function(err, new_object) {
     if (err) {
       return res.status(500).end();
     }
       return res.json(new_object);
     });
    }
  }
// App.find().populate({
//          path: 'panel'
//        }).populate({
//          path:'master'
//        }).exec(function(err, res) {

//          Model.populate(docs, options, callback).