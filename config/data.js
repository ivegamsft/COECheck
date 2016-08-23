var fs = require('fs');
var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;

// Setup client
var host = process.env.DOCUMENTDB_ENDPOINT;
var masterKey = process.env.DOCUMENTDB_PRIMARY_KEY;
var client = new DocumentClient(host, { masterKey: masterKey });

// Define collection names and starter JSON documents
var collectionDefinitions = [
    { body: { id: "Assessments" }, docsRef: 'config/documents/assessments.json' },
    { body: { id: "Groups" }, docsRef: 'config/documents/groups.json' },
    { body: { id: "Schema" }, docsRef: 'config/documents/schema.json' },
];

module.exports = {

    docDbSetup: false,

    docDbClient: function () {

        // Check if DocDB has been setup
        if (this.docDbSetup) {

            // DocDB is already setup
            // Return the client
            console.log('Returning DocumentDB client');
            return client;

        }
        else {

            // DocDB has not been setup
            // Check if the database exists
            console.log('Setting up DocumentDB database');
            this.docDbSetup = true;
            setupDocDb(this.db);
            return client;

        }

    },

    db: process.env.DOCUMENTDB_DATABASE  // Name for the DocDB database

};

function setupDocDb(databaseId, callback) {

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

    client
        .queryDatabases(querySpec)
        .toArrayAsync()
        .then(function (results) {

            // Check if a database already exists
            if (results.feed.length === 0) {

                // No database, continue on
                console.log('No database found in DocumentDB');
                createDatabase(databaseId);

            }
            else {

                // A database of this name already exists
                // Assuming that we're good to good
                // TODO: more thoroughly ensure the DB is set properly 

            }

        });

}

function createDatabase(databaseId) {

    console.log('Creating DocumentDB database and collections');

    // Create a database definition
    var databaseDefinition = {
        id: databaseId
    };

    client
        .createDatabaseAsync(databaseDefinition)
        .then(function (databaseResponse) {

            var database = databaseResponse.resource;

            // Loop through the list of collections
            collectionDefinitions.forEach(function (collectionDefinition, index) {

                // Create a new collection
                client
                    .createCollectionAsync(database._self, collectionDefinition.body)
                    .then(function (result) {

                        // Collection created, load documents from filesystem
                        fs.readFile(collectionDefinition.docsRef, 'utf8', function (error, data) {

                            // Parse documents into JSON// Parse results into JSON
                            var parsedDocuments = JSON.parse(data);

                            // Upload documents into collection one at a time
                            parsedDocuments.forEach(function (document, index) {

                                client.createDocumentAsync(result.resource._self, document);

                            });

                        });

                    })
                    .fail(function (error) {

                        console.error('There was a problem creating a DocumentDB collection');
                        console.error(error);

                    });

            });

        })
        .fail(function (error) {
            console.error('There was an error creating the DocumentDB database and collections');
            console.error(error);
        });

}
