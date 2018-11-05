var app  = require('express')();
var server = require('http').Server(app)
const io = require('socket.io')(server, { cookie: true });
const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser')


var configDB = require('./config/database.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: false,
    saveUninitialized: true
}));


mongoose.connect(configDB.url); // connect to our database
// allow cors with credential
app.use(cors({ origin:"http://localhost:3000", credentials:true }))
app.use(cookieParser()); // read cookies (needed for auth)
require('./config/passport')(passport); // pass passport for configuration



app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes.js')(app,io); // load our routes and pass in our app and fully configured passport
require('./app/router.js')(app);
// launch ======================================================================
server.listen(port);
console.log('listening on port ', port);
