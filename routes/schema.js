var express = require('express');
var router = express.Router();
var passport = require('passport');

// setup DocDB
var client = require('../config/data').docDbClient();

/* GET rubric */
router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define database and column links
    var dbLink = 'dbs/' + process.env.DOCUMENTDB_DATABASE;
    var collLink = dbLink + '/colls/' + 'Schema';

    // define a schema spec
    var querySpec = {
        query: 'SELECT TOP 1 * FROM c ORDER BY c.version DESC'
    };

    // query DocDB for the schema
    client.queryDocuments(collLink, querySpec).toArray(function (err, result) {
        if (err) {
            console.error(err);
        }
        else {

            // log the schema version
            console.info('Using schema version ' + result[0].version);

            // return schema value
            res.json(result[0]);

        }
    });

});

module.exports = router;