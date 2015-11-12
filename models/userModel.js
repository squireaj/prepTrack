//              //
//  USER MODEL  //
//              //

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var q = require('q');

var userSchema = new Schema({
	name: {type: String},
	email: {type: String},
	password: {type: String},
	age: {type: Number},
	gender: {type: String},
	calories: {type: Number},
	protein : {type: Number},
	carbs : {type: Number},
	fat : {type: Number},
	locations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
});

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			return next();
		});
	});
});

userSchema.methods.comparePassword = function(pass) {
	var deferred = q.defer();
	bcrypt.compare(pass, this.password, function(err, isMatch) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(isMatch);
		}
	});
	return deferred.promise;
};

module.exports = mongoose.model('User', userSchema);