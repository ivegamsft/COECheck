var express = require('express');
var router = express.Router();
var passport = require('passport');

var request = require('request');
var markdown = require("markdown").markdown;

/* GET rubric */
//router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {
router.get('/help', function (req, res) {

    // Set URL for Markdown file
    var url = 'https://raw.githubusercontent.com/GSIAzureCOE/COECheck/master/README.md';

    // GET the Markdown file
    request(url, function (error, response, body) {
      
        // Check status code to ensure successfully response
        if (!error && response.statusCode == 200) {

            // Parse Markdown content into HTML
            var parsedContent = markdown.toHTML(body); 

            // Return HTML
            res.send(parsedContent);

        }

    });

});

module.exports = router;