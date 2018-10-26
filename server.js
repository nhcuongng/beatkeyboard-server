var express  = require('express');
var app      = express();
// var io = require('socket.io')();
var port     =  8080;
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors')

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// listen socket
// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//       console.log('client is subscribing to timer with interval ', interval);
//       setInterval(() => {
//         client.emit('timer', new Date());
//       }, interval);
//     });
//     console.log(client.id)
//   });
mongoose.connect(configDB.url); // connect to our database
// allow cors with credential
app.use(cors({ origin:"http://localhost:3000", credentials:true }))
app.use(cookieParser()); // read cookies (needed for auth)
require('./config/passport')(passport); // pass passport for configuration

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
