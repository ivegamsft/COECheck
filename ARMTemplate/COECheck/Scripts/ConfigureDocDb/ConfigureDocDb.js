// Imports
var fs = require('fs');
var DocumentClient = require('documentdb').DocumentClient;

// Add your endpoint
var host = process.argv[2] || 'https://0000000000.documents.azure.com:443/';

// Add the massterkey of the endpoint
var masterKey = process.argv[3] || '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

// Create a client
var client = new DocumentClient(host, { masterKey: masterKey });

// Define a database name
var databaseDefinition = { id: "COECheck" };

// Define collection names and starter JSON documents
var collectionDefinitions = [
    { body: { id: "Assessments" }, docsRef: './assets/assessments.json' },
    { body: { id: "Groups" }, docsRef: './assets/groups.json' },
    { body: { id: "Schema" }, docsRef: './assets/schema.json' },
];

// Check if database already exists
findDatabaseById(databaseDefinition.id, function (err, db) {

    // No database was found, create database
    if (db === null) {

        // Load documents from disk
        loadDocuments(function () {

            console.log('No existing database found with the specified ID. Creating new database');

            // Create the database
            client.createDatabase(databaseDefinition, function (err, database) {

                if (err) return console.log(err);

                console.log('Successfully created the database');

                // Loop through the collections
                var collectionCounter = 0;
                collectionDefinitions.forEach(function (collectionDefinition, index) {

                    // Create a collection
                    client.createCollection(database._self, collectionDefinition.body, function (err, collection) {

                        if (err) return console.log(err);

                        console.log('Successfully created collection container - ' + collection.id);

                        // Check if the definition includes documents
                        if (collectionDefinition.documents) {

                            // Loop through the collection's documents
                            var documentCounter = 0;
                            collectionDefinition.documents.forEach(function (documentDefinition, index) {

                                // Create documents
                                client.createDocument(collection._self, documentDefinition, function (err, document) {

                                    if (err) return console.log(err);

                                    console.log('Created Document with content: ', document.id);

                                    documentCounter++;
                                    if (documentCounter == collectionDefinition.documents.length) {
                                        // Loop is complete
                                        console.log('Successfully created all documents for ' + collection.id);
                                    }

                                });

                            });

                            // Iterate the counter
                            collectionCounter++;
                            if (collectionCounter == collectionDefinitions.length) {
                                // Loop is complete
                                console.log('Successfully created all ' + collectionDefinitions.length + ' collections');
                            }

                        }

                    });

                });

            });

        });

    }
    else {

        // A database with that ID was found to exist
        console.log('A database with the specified ID already exists. Stopping script.');

    }

});

function findDatabaseById(databaseId, callback) {

    // Check if a database exists for a given ID

    var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.id = @id',
        parameters: [
            {
                name: '@id',
                value: databaseId
            }
        ]
    };

    client.queryDatabases(querySpec).toArray(function (err, results) {
        if (err) {
            console.log(err);
        }

        if (results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            // so, explictly return null
            callback(null, null);
        } else {
            // we found a database, so return it
            callback(null, results[0]);
        }

    });

}

function loadDocuments(callback) {

    // Loop through the collection definitions
    // Load documents into the array
    var counter = 0;
    var counterTotal = 0;
    collectionDefinitions.forEach(function (collectionDefinition, index) {

        // Check if the definition includes a reference to a documents file
        if (collectionDefinition.docsRef) {

            counterTotal++;

            // Read documents file from filesystem
            fs.readFile(collectionDefinition.docsRef, 'utf8', function (error, data) {

                if (error) return console.log(error);

                // Parse results into JSON
                var parsedDocuments = JSON.parse(data);

                // Store parsed documents in the orignal array
                collectionDefinitions[index].documents = parsedDocuments;

                // Iterate the counter
                counter++;
                if (counter === counterTotal) {
                    // Finished loading documents
                    callback();
                }

            });

        }

    });

}