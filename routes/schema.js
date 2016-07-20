var express = require('express');
var router = express.Router();
var passport = require('passport');

// setup DocDB
var client = require('../config/data').docDbClient();
var config = {
    database: require('../config/data').db
};

/* GET rubric */
router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define database and column links
    var dbLink = 'dbs/' + config.database;
    var collLink = dbLink + '/colls/' + 'Schema';

    // define a schema spec
    var querySpec = {
        query: 'SELECT TOP 1 * FROM c ORDER BY c.version DESC'
    };

    // Query DocDB for the latest schema
    client
        .queryDocuments(collLink, querySpec)
        .toArrayAsync()
        .then(function (result) {

            // Log the schema version
            console.info('Using schema version ' + result.feed[0].version);

            // Return schema value
            res.json(result.feed[0]);

        })
        .fail(function (error) {
            console.log(error);
        });

});

module.exports = router;