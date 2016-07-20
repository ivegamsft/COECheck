var express = require('express');
var router = express.Router();
var passport = require('passport');
var _ = require('lodash/string');

// setup DocDB
var client = require('../config/data').docDbClient();
var config = {
    database: require('../config/data').db
};

/* GET Groups. */
router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define a query 
    var docsQuerySpec = {
        query: 'SELECT * FROM r'
    };

    // Define collection link
    var collLink = 'dbs/' + config.database + '/colls/' + 'Groups';

    // Query for all documents in the collection
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

/* POST new Group*/
router.post('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define collection link
    var collLink = 'dbs/' + config.database + '/colls/' + 'Groups';

    // Create a document to upload
    var documentDefinition = {
        "title": req.body.groupName,
        "type": "Group"
    };

    // Upload new document to DocDB via SDK
    client
        .createDocumentAsync(collLink, documentDefinition)
        .then(function (doc) {

            // return new document back
            res.send(doc.resource);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* EDIT a group*/
router.put('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define a link to the document
    var colLink = 'dbs/' + config.database + '/colls/' + 'Groups';

    // Pass updated document to the upsert method
    client
        .upsertDocumentAsync(colLink, req.body)
        .then(function (doc) {

            console.log('Successfully upserted ' + req.body.id);
            res.send(doc.resource);

        })
        .fail(function (error) {
            console.error(error);
        });

});

/* DELETE a Group */
router.delete('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // Define document link
    var docLink = 'dbs/' + config.database + '/colls/' + 'Groups' + '/docs/' + req.body.id;

    // Delete document
    client
        .deleteDocumentAsync(docLink)
        .then(function (doc) {

            // Return true for a successful delete
            res.send(true.resource);

        })
        .fail(function (error) {
            console.error(error);
            res.send(false);
        });

});

// GET all assessments for a given group
router.get('/:name/assessments', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a query
    var querySpec = {
        query: 'SELECT * FROM r WHERE r["group"]=@name AND r.deleted=false ORDER BY r.created DESC',
        parameters: [{
            name: '@name',
            value: req.params.name
        }]
    };

    // Define collection link
    var colLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // Query for documents
    client
        .queryDocuments(colLink, querySpec)
        .toArrayAsync()
        .then(function (docs) {

            // Return documents
            res.send(docs.feed);

        })
        .fail(function (error) {
            console.error(error);
        });

});

module.exports = router;