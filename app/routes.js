const url = require('../config/url')
const ApiFacebook = require('../api/loginfacebook/routeFacebook')
var count= 1, countRoom=1;
var roomInfor = []

module.exports = function(app, io) {
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.send("Trang chủ")
    });

    io.on('connection', (socket) => {
        var room = '#Battleroyal ' + count;
        // Join to room and limit 2 members in one room (rooms is difference)
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
            // var room = io.sockets.adapter.rooms[room];
            // if(room.length < 2){
            //     socket.join(room)
            // }
            count++
          }

          // listen event: user1 send to server (from client)
          socket.on('user1-send-to-server',(data) => {   
            socket.broadcast.to(room).emit("server-send-to-user2",data) // send to other client in room
          })

          // Waiting users connect to server
          // Delay time is 3.5s
           socket.on("looking-for-opponent",(data) =>{
                if(data.nameUser !== " "){
                    roomInfor.push(data.nameUser) // wwhen user is not log: nameUser is ""
                }
                // send user and nameRoom to client after delay time
                setTimeout(()=> {
                    roomInfor.push(room)
                    socket.emit('success', roomInfor)          
                }, 3500)
            })
            // reset list of user when event end
            roomInfor = []   
    })

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        // get user from session and send to client
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