var url = require('../config/url')
const ApiFacebook = require('../api/loginfacebook/routeFacebook')
module.exports = function(app) {
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.send("Trang chủ")
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        // get user from session and send to client
        res.send({ user: req.user })
    });

    // uthenticate with Facebook
    app.use('/api/auth/facebook',ApiFacebook)

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        console.log(req.session)
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