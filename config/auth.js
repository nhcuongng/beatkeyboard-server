
module.exports = {
    'facebookAuth' : {
        'clientID'        : '504950676651937', // your App ID
        'clientSecret'    : '603904ee9f534deccfced9c0cd202ce6', // your App Secret
        'callbackURL'     : 'http://localhost:8080/api/auth/facebook/callback',// on heroku: https://beatkeyboard-server.herokuapp.com 
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name','photos'] // For requesting permissions from Facebook API
    },
}