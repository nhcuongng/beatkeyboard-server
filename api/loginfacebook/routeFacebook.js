const express = require("express");
const router = express.Router();
var passport = require('passport');
var url = require('../../config/url')

 // send to facebook to do the authentication
 router.get('/', passport.authenticate('facebook', { scope : ['public_profile', 'email'] },));

 // handle the callback after facebook has authenticated the user
 router.get('/callback',
     passport.authenticate('facebook', {
         successRedirect : "https://beatkeyboard.herokuapp.com", // success then redirect to clienthost/profile
         failureRedirect : '/'
     }));

module.exports = router;