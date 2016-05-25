var passport = require('passport');

// Load Configuration
var config = {

    // The app id you get from the registration portal
    audience: '0c979fac-8467-46b0-8711-2856ebfde62b',

    // Passport will use this URL to fetch the token validation information from Azure AD
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration'

};

module.exports = function (app) {

    // Pull in the Azure AD bearer passport strategy
    var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

    // Load passport and configure it to use Azure AD Bearer auth
    app.use(passport.initialize());
    passport.use(new OIDCBearerStrategy({
        "identityMetadata": config.identityMetadata,
        "audience": config.audience,
        "validateIssuer": false,
    }, function (token, done) {
        return done(null, token, null);
    }));

};