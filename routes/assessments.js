var express = require('express');
var router = express.Router();
var passport = require('passport');

// setup DocDB
var client = require('../config/data').docDbClient();
var config = {
    database: require('../config/data').db
};

/* GET assessments */
router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // Create a query
    var docsQuerySpec = {
        query: 'SELECT * FROM r WHERE r.deleted=false'
    };

    // Query for all documents in the collection
    client
        .queryDocuments(collLink, docsQuerySpec)
        .toArrayAsync()
        .then(function (docs) {

            // Return all documents to the client as JSON 
            res.json(docs.feed);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* GET assessment */
router.get('/:id', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define a link to the document
    var docLink = 'dbs/' + config.database + '/colls/' + 'Assessments' + '/docs/' + req.params.id;

    // Read document
    client
        .readDocumentAsync(docLink)
        .then(function (doc) {

            // Return document 
            res.send(doc.resource);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* POST my assessments */
router.post('/my', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // Create a query
    var docsQuerySpec = {
        query: 'SELECT * FROM r  WHERE r.deleted=false AND r.author.upn = "' + req.body.upn + '"'
    };

    // Query for all documents in the collection matching the given user name
    client
        .queryDocuments(collLink, docsQuerySpec)
        .toArrayAsync()
        .then(function (docs) {

            // return all documents to the client as JSON 
            res.json(docs.feed);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* POST assessment */
router.post('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    var documentData = req.body;

    // Define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // Create a new document
    client
        .createDocumentAsync(collLink, documentData)
        .then(function (result) {

            // return the document back to the client 
            res.json(result.resource);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* DELETE assessment */
router.delete('/:id', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // This is a "soft delete" where the document is not physically deleted from the server
    // But instead has the field "deleted" toggled to true

    // define a link to the document
    var colLink = 'dbs/' + config.database + '/colls/' + 'Assessments';
    var docLink = 'dbs/' + config.database + '/colls/' + 'Assessments' + '/docs/' + req.params.id;

    // Read document
    client
        .readDocumentAsync(docLink)
        .then(function (doc) {

            // Copy original document
            var updatedDoc = doc.resource;

            // Update document's deleted attribute
            updatedDoc.deleted = true;

            client
                .upsertDocumentAsync(colLink, updatedDoc)
                .then(function (doc) {

                    // Successfully upserted document
                    console.log('Successfully upserted ' + req.params.id);
                    res.send(true);

                })
                .fail(function (error) {
                    console.log('There was an error with the upsert on ' + req.params.id);
                    console.error(error);
                    res.send(false);
                });

        })
        .fail(function (error) {
            console.error(error);
        });

});

module.exports = router;