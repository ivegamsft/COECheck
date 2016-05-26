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

    // define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // create a query
    var docsQuerySpec = {
        query: 'SELECT * FROM r WHERE r.deleted=false'
    };

    // query for all documents in the collection
    client.queryDocuments(collLink, docsQuerySpec).toArray(function (err, docs) {

        // return all documents to the client as JSON 
        res.json(docs);

    });

});

/* GET assessment */
router.get('/:id', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a link to the document
    var docLink = 'dbs/' + config.database + '/colls/' + 'Assessments' + '/docs/' + req.params.id;

    // read document
    client.readDocument(docLink, function (err, doc) {

        if (err) {
            console.log('There was an error retrieving the document ' + req.params.id);
        }
        else {
            // return all documents to the client as JSON 
            res.send(doc);
        }

    });

});

/* POST my assessments */
router.post('/my', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';

    // create a query
    var docsQuerySpec = {
        query: 'SELECT * FROM r  WHERE r.deleted=false AND r.author.upn = "' + req.body.upn + '"'
    };

    // query for all documents in the collection matching the given user name
    client.queryDocuments(collLink, docsQuerySpec).toArray(function (err, docs) {

        // return all documents to the client as JSON 
        res.json(docs);

    });

});

/* POST assessment */
router.post('/', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    var documentData = req.body;

    // define a link to the collection
    var collLink = 'dbs/' + config.database + '/colls/' + 'Assessments';


    // create a new document
    client.createDocument(collLink, documentData, function (err, result) {

        // return the document back to the client 
        res.json(result);

    });

});

/* Delete assessment */
router.delete('/:id', passport.authenticate('oauth-bearer', { session: false }), function (req, res) {

    // define a link to the document
    var colLink = 'dbs/' + config.database + '/colls/' + 'Assessments';
    var docLink = 'dbs/' + config.database + '/colls/' + 'Assessments' + '/docs/' + req.params.id;

    // read document
    client.readDocument(docLink, function (err, doc) {

        if (err) {
            console.log('There was an error retrieving the document ' + req.params.id);
        }
        else {

            // copy original document
            var updatedDoc = doc;

            // update document's deleted attribute
            updatedDoc.deleted = true;

            client.upsertDocument(colLink, updatedDoc, function (err, doc) {

                if (err) {
                    console.log('There was an error with the upsert on ' + req.params.id);
                    res.send(false);
                }
                else {
                    console.log('Successfully upserted ' + req.params.id);
                    res.send(true);
                }

            });

        }

    });

});

module.exports = router;