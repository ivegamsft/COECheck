var express = require('express');
var router = express.Router();
var passport = require('passport');
var _ = require('lodash/string');

// setup DocDB
var client = require('../config/data').docDbClient();
var config = {
    database: require('../config/data').db
};

/* GET partners. */
router.get('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: config.database
        }]
    };

    // query for all databases
    client.queryDatabases(querySpec).toArray(function (err, database) {

        var collectionsQuerySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: 'Partners'
            }]
        };

        // query for all collections in the database
        client.queryCollections(database[0]._self, collectionsQuerySpec).toArray(function (err, collections) {

            var docsQuerySpec = {
                query: 'SELECT * FROM r'
            };

            // query for all documents in the collection
            client.queryDocuments(collections[0]._self, docsQuerySpec).toArray(function (err, docs) {

                // return all documents to the client as JSON 
                res.json(docs);

            });

        });

    });

});

/* POST new partner*/
router.post('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // definie database and column links
    var dbLink = 'dbs/' + config.database;
    var collLink = dbLink + '/colls/' + 'Partners';

    // create a document to upload
    var documentDefinition = {
        "title": req.body.partnerName,
        "type": "Partner"
    };

    // upload new document to DocDB via SDK
    client.createDocument(collLink, documentDefinition, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            // return new document back
            res.send(doc);
        }
    });

});

/* EDIT a partner*/
router.put('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a link to the document
    var colLink = 'dbs/' + config.database + '/colls/' + 'Partners';

    // pass updated document to the upsert method
    client.upsertDocument(colLink, req.body, function (err, doc) {

        if (err) {
            console.log('There was an error with the upsert on ' + req.body.id);
            res.send(false);
        }
        else {
            console.log('Successfully upserted ' + req.body.id);
            res.send(doc);
        }

    });

});

/* DELETE a partner*/
router.delete('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define document link
    var docLink = 'dbs/' + config.database + '/colls/' + 'Partners' + '/docs/' + req.body.id;

    // delete document
    client.deleteDocument(docLink, function (err, doc) {
        if (err) {
            console.log(err);
            // return false for a failed delete
            res.send(false);
        }
        else {
            // return true for a successful delete
            res.send(true);
        }
    });

});

// GET all assessments for a given partner
router.get('/:name/assessments', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a query
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.partner=@name AND r.deleted=false ORDER BY r.created DESC',
        parameters: [{
            name: '@name',
            value: req.params.name
        }]
    };

    // define collection link
    var colLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // query for documents
    client.queryDocuments(colLink, querySpec).toArray(function (err, docs) {

        if (err) {
            res.send(false);
        }
        else {
            res.send(docs);
        }

    });

});

module.exports = router;