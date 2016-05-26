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

    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: config.database
        }]
    };

    // query for all databases
    client.queryDatabases(querySpec).toArray(function (error, database) {

        if (error) return console.error(error);

        var collectionsQuerySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: 'Groups'
            }]
        };

        // query for all collections in the database
        client.queryCollections(database[0]._self, collectionsQuerySpec).toArray(function (error, collections) {

            if (error) return console.error(error);

            var docsQuerySpec = {
                query: 'SELECT * FROM r'
            };

            // query for all documents in the collection
            client.queryDocuments(collections[0]._self, docsQuerySpec).toArray(function (error, docs) {

                if (error) return console.error(error);

                // return all documents to the client as JSON 
                res.json(docs);

            });

        });

    });

});

/* POST new Group*/
router.post('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // definie database and column links
    var dbLink = 'dbs/' + config.database;
    var collLink = dbLink + '/colls/' + 'Groups';

    // create a document to upload
    var documentDefinition = {
        "title": req.body.groupName,
        "type": "Group"
    };

    // upload new document to DocDB via SDK
    client.createDocument(collLink, documentDefinition, function (error, doc) {
        
        if (error) {
            console.log(error);
        }
        else {
            // return new document back
            res.send(doc);
        }
        
    });

});

/* EDIT a group*/
router.put('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a link to the document
    var colLink = 'dbs/' + config.database + '/colls/' + 'Groups';

    // pass updated document to the upsert method
    client.upsertDocument(colLink, req.body, function (error, doc) {

        if (error) {
            console.log('There was an error with the upsert on ' + req.body.id);
            res.send(false);
        }
        else {
            console.log('Successfully upserted ' + req.body.id);
            res.send(doc);
        }

    });

});

/* DELETE a Group */
router.delete('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define document link
    var docLink = 'dbs/' + config.database + '/colls/' + 'Groups' + '/docs/' + req.body.id;

    // delete document
    client.deleteDocument(docLink, function (error, doc) {
        if (error) {
            console.log(error);
            // return false for a failed delete
            res.send(false);
        }
        else {
            // return true for a successful delete
            res.send(true);
        }
    });

});

// GET all assessments for a given group
router.get('/:name/assessments', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a query
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.group=@name AND r.deleted=false ORDER BY r.created DESC',
        parameters: [{
            name: '@name',
            value: req.params.name
        }]
    };

    // define collection link
    var colLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // query for documents
    client.queryDocuments(colLink, querySpec).toArray(function (error, docs) {

        if (error) {
            res.send(false);
        }
        else {
            res.send(docs);
        }

    });

});

module.exports = router;