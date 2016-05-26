module.exports = {

    docDbClient: function () {
        // setup DocDB
        var DocumentClient = require('documentdb').DocumentClient;
        var host = process.env.DOCUMENTDB_ENDPOINT;
        var masterKey = process.env.DOCUMENTDB_PRIMARY_KEY;
        var client = new DocumentClient(host, { masterKey: masterKey });

        return client;
    },
    db: 'COECheck'

};