
module.exports = {
    'facebookAuth' : {
        'clientID'        : '2253490058199856', // your App ID
        'clientSecret'    : 'c7c3d3ac930671cb39bf459a35cde8f9', // your App Secret
        'callbackURL'     : 'http://localhost:8080/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name','photos'] // For requesting permissions from Facebook API
    },
}