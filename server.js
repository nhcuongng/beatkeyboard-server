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





// function bot(socket,room) {
//   console.log('đây là bot game')
//   io.engine.generateId = (req) => {
//     return "daylabotgamebeatkeys"
//   }
//   socket.join(room)
//   const characters = ["a","b", "c", "d","e","f", "g", "h","i","j", "k", "l","m","n","o","p", "q", "r","s","t", "v", "x","y","z", 
//                       "1", "2","3","4", "5", "6","7","8", "9", "10"
//                       ,"[","]", "{", "}","<",">", "?", "=","+","_", "\\", "/",":","", "'", " ","`","~"]
  
    
//   socket.on('user1-send-to-server',() => {
//       socket.broadcast.to(room).emit("server-send-to-user2",characters[Math.floor(Math.random() * characters.length)+1]) // send to other client in room
//     })

// }


mongoose.connect(configDB.url); // connect to our database
// allow cors with credential
app.use(cors({ origin:"https://beatkeyboard.herokuapp.com", credentials:true }))
app.use(cookieParser()); // read cookies (needed for auth)
require('./config/passport')(passport); // pass passport for configuration



app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes.js')(app,io); // load our routes and pass in our app and fully configured passport
require('./app/router.js')(app);
// launch ======================================================================
server.listen(port);
console.log('listening on port ', port);
