//**********                                              **********
//******************* definititions and requires *******************
//**********                                              ********** 

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

//**********                              **********
//******************* Middleware *******************
//**********                              **********          

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


//**********                               **********
//******************* Controllers *******************
//**********                               ********** 

var ServerLocationCtrl = require('./controllers/ServerLocationCtrl');
var ServerObjectCtrl = require('./controllers/ServerObjectCtrl');
var ServerUserCtrl = require('./controllers/ServerUserCtrl');

//**********                          **********
//******************* Models *******************
//**********                          ********** 

var Location = require('./models/locationModel');
var Object = require('./models/objectModel');
var User = require('./models/userModel');

//**********                            **********
//******************* Database *******************
//**********                            ********** 

var mongoUri = "mongodb://localhost:27017/preptrack";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log("Connected on " + mongoUri);
});

//**********                        **********
//******************* Port *******************
//**********                        ********** 

var port = 8080; 
app.listen(process.env.EXPRESS_PORT || port, function(){
    console.log("The Wolverine Pack is hunting on port ", port); 
});

//**********                          **********
//******************* Static *******************
//**********                          ********** 

app.use(express.static(__dirname+'/public'));

//**********                             **********
//******************* Endpoints *******************
//**********                             ********** 

//@@@@@ Auth @@@@@

//@@@@@ Location @@@@@

app.post('/api/newlocation', ServerLocationCtrl.createlocation);
// app.get('/api/getlocations', ServerLocationCtrl.getlocations);
// app.get('/api/getlocation/:id', ServerLocationCtrl.getlocation);

// //@@@@@ Object @@@@@

// app.post('/api/newlocation', ServerLocationCtrl.newlocation);
// app.get('/api/getlocations', ServerLocationCtrl.getlocations);
// app.get('/api/getlocation/:id', ServerLocationCtrl.getlocation);









