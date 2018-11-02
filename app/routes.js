const url = require('../config/url')
const ApiFacebook = require('../api/loginfacebook/routeFacebook')
var cookie = require('cookie');
var EventEmitter = require("events").EventEmitter;
var userLogged = new EventEmitter(); // use to get username is logged in
var count= 1, countRoom=1;

module.exports = function(app, io) {
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.send("Trang chủ")
    });

    io.on('connection', (socket) => {
        var room = '#Battleroyal ' + count;
        // // Join to room and limit 2 members in one room (rooms is difference)
        console.log(socket.id + " đã kết nối")

        // check when user exit room
        socket.on('disconnect', () => {
            console.log(socket.id + "đã thoát")
        })

        // user join in room
        socket.join(room, () => { 
            // let rooms = Object.keys(socket.rooms);
            // console.log(rooms)
            countRoom++
          })
          if(countRoom % 4 === 0){
            count++
          }

          // listen event: user1 send to server (from client)
          socket.on('user1-send-to-server',(data) => {   
            socket.broadcast.to(room).emit("server-send-to-user2",data) // send to other client in room
          })
          socket.on("getid", (abc) =>{
              socket.emit("get-id-success", abc) 
          })
           console.log(Object.keys( io.sockets.adapter.sids[socket.id] ))
           socket.on("looking-for-opponent",(data) =>{
            console.log(data.socketId + " is a socketid ")
             if(socket.id !== data.socketId){
                userLogged.on('get', () => {
                    socket.emit("success", { nameUser: userLogged.data })
                 })
             }else{
                socket.emit("success", { nameUser: "Waiting...."})
             }
           })      
    })

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        // get user from session and send to client
        userLogged.data = req.user.name;
        userLogged.emit('get');
        res.send({ user: req.user })
    });

    // uthenticate with Facebook
    app.use('/api/auth/facebook',ApiFacebook)

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logOut();
        req.session.destroy();
        res.redirect(url.urlClient);
    });
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}