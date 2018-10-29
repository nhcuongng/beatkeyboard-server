const express = require("express");
const router = express.Router();
var passport = require('passport');
var url = require('../../config/url')
 // send to facebook to do the authentication

 router.get('/', passport.authenticate('facebook', { scope : ['public_profile', 'email'] },));
console.log(url.urlClient)
 // handle the callback after facebook has authenticated the user
 router.get('/callback',
     passport.authenticate('facebook', {
         successRedirect : url.urlClient+'/', // success then redirect to clienthost/profile
         failureRedirect : '/'
     }));
//  app.get('/unlink/facebook', isLoggedIn, function(req, res) {
//    var user            = req.user;
//    user.facebook.token = undefined;
//    user.save(function(err) {
//        res.redirect('/profile');
//    });
// });

module.exports = router;