var FacebookStrategy = require('passport-facebook').Strategy;

var User       = require('../app/model/UserModel');

var configAuth = require('./auth'); // use this one for testing
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        console.log(user.image)

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.token) {
                            user.token = token;
                            user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.email = (profile.emails[0].value || '').toLowerCase();
                            user.image = profile.photos ? profile.photos[0].value : 'http://fenhance.com/images/signup/img-default.png'
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.id    = profile.id;
                        newUser.token = token;
                        newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.image = profile.photos ? profile.photos[0].value : 'http://fenhance.com/images/signup/img-default.png'
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.id    = profile.id;
                user.token = token;
                user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.email = (profile.emails[0].value || '').toLowerCase();
                user.image = profile.photos ? profile.photos[0].value : 'http://fenhance.com/images/signup/img-default.png'

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
}