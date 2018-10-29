
module.exports = {
    'facebookAuth' : {
        'clientID'        : '734238596944122', // your App ID
        'clientSecret'    : '52aeb2d122fe01f62cc9f4b5ec13944a', // your App Secret
        'callbackURL'     : 'http://localhost:8080/api/auth/facebook/callback',// on heroku: https://beatkeyboard-server.herokuapp.com 
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name','photos'] // For requesting permissions from Facebook API
    },
}