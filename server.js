var app  = require('express')();
var server = require('http').Server(app)
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors')
var countRoom = 1;
var count= 1
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');


io.on('connection', (socket) => {
    
    var room = '#Battleroyal ' + count;
    // Join to room and limit 2 members in one room (rooms is difference)
    socket.join(room, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms)
        countRoom++
    })
      if(countRoom % 2 === 0){
        count++
      }
      
    socket.on('user1-send-to-server',(data) => {
         socket.broadcast.to(room).emit("server-send-to-user2",data) // send to other client in room
    })
});
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
server.listen(port);
console.log('listening on port ', port);
