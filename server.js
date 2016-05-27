// Load Packages
var express = require('express');

// Setup data connections
var data = require('./config/data');

// Setup Express
var app = express();

// Configure Express
require('./config/express')(app, express);

// Configure routes
require('./config/routes')(app);

// Configure authentication with Passport
require('./config/auth')(app);

// Set up routes, each using Azure AD bearer auth
app.use(express.Router());

// Configure Application Insights
require('./config/appInsights')(app);

// Start Server
var port = process.env.port || 1337;
var server = app.listen(port, function() {
	console.log('COECheck app listening at on port ', port);
});
