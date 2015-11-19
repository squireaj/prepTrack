//          //
//  SERVER  //
//          //

//**********        *                            *        **********
//******************* Definititions and Requires *******************
//**********        *                            *        ********** 

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var app = express();

//**********        *            *        **********
//******************* Middleware *******************
//**********        *            *        **********          

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(session({
    secret: 'BeReady', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Dallins test 
app.use(function(req,res,next){
 console.log('Request Object:');
 console.log('Session ID:', req.session.id);
 next();
});


//**********        *             *        **********
//******************* Controllers *******************
//**********        *             *        ********** 

var ServerLocationCtrl = require('./controllers/ServerLocationCtrl');
var ServerObjectCtrl = require('./controllers/ServerObjectCtrl');
var ServerUserCtrl = require('./controllers/ServerUserCtrl');
var ServerMacroCtrl = require('./controllers/ServerMacroCtrl')

//**********        *        *        **********
//******************* Models *******************
//**********        *        *        ********** 

var Location = require('./models/locationModel');
var Object = require('./models/objectModel');
var User = require('./models/userModel');

//**********        *          *        **********
//******************* Database *******************
//**********        *          *        ********** 

var mongoUri = "mongodb://localhost:27017/preptrack";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log("Connected on " + mongoUri);
});

//**********        *      *        **********
//******************* Port *******************
//**********        *      *        ********** 

var port = 8080; 
app.listen(port, function(){
    console.log("The Wolverine Pack is hunting on port ", port); 
});

//**********        *        *        **********
//******************* Static *******************
//**********        *        *        ********** 

app.use(express.static(__dirname+'/public'));

//**********        *             *        **********
//******************* Local Login *******************
//**********        *             *        ********** 

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    console.log(username, password)
    User.findOne({ email: username }).exec().then(function(user) {
        if (!user) {
            return done(null, false);
            console.log('no user');
        }
        user.comparePassword(password).then(function(isMatch) {
            if (!isMatch) {
                console.log('no match');
                return done(null, false);
            }
            return done(null, user);
        });
    });
}));

//**********        *                     *        **********
//******************* Authorization Check *******************
//**********        *                     *        ********** 

var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({message: "Logged In"   }).end();
    }
    return next();
}

//**********        *                       *        **********
//******************* serialize/deserialize *******************
//**********        *                       *        ********** 

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//**********        *           *        **********
//******************* Endpoints *******************
//**********        *           *        ********** 

//- - - ServerUserCtrl.js - - -

//@-@-@-@-@-@-@-@-@-@ - Auth - @-@-@-@-@-@-@-@-@-@

//-- Create New User
app.post('/api/users', ServerUserCtrl.createUser);

//-- Authenticate User
app.post('/api/users/auth', passport.authenticate('local'), function(req, res) {
    console.log("Logged In" + req.user); 
    return res.status(200).json(req.user).end();
});

//-- Logout
app.get('/api/auth/logout', function(req, res) {
    req.logout();
    return res.redirect('/#login');
});

//-- Get User
app.get('/api/auth/getUser', function(req, res){
    if(req.user){return res.status(200).json(req.user)}else{res.status(403).end()}
})

//  !!!  - - - ServerLocationCtrl.js - - -

//@-@-@-@-@-@-@-@-@-@ - General Location - @-@-@-@-@-@-@-@-@-@

//-- Create New Location
app.post('/api/newlocation',    requireAuth, ServerLocationCtrl.newLocation);

//-- Get All Locations 
app.get('/api/getlocations', ServerLocationCtrl.getLocations);

//-- Get Single Location
app.get('/api/getlocation/:_id', requireAuth, ServerLocationCtrl.getLocation);

//-- Delete Single Location
app.delete('/api/deletelocation/:User_id/location/:Location_id', ServerLocationCtrl.deleteLocation)

//@-@-@-@-@-@-@-@-@-@ - User Location - @-@-@-@-@-@-@-@-@-@

//-- Add location to user
app.post('/api/users/:User_id/locations/:Location_id', ServerLocationCtrl.pushLocationToUser);

//-- Get Users Locations 
app.get('/api/users/:User_id', ServerLocationCtrl.getUsersLocations);

// !!! - - - ServerObjectCtrl.js - - -

//@-@-@-@-@-@-@-@-@-@ - Object - @-@-@-@-@-@-@-@-@-@

//--Create New Object

app.post('/api/objects', ServerObjectCtrl.newObject)

//-- Add Object to Location
app.post('/api/locations/:Location_id', ServerObjectCtrl.addObjectToLocation);

//-- Remove Object from Location

app.delete('/api/deleteobject/:Object_id/:Location_id', ServerObjectCtrl.removeObjectFromLocation)

// !!! - - - macroController.js - - - 

app.put('/api/updateUsersMacros', ServerMacroCtrl.updateUsersMacros)











