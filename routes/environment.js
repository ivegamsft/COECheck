var express = require('express');
var router = express.Router();

/* GET rubric */
// Anonymous route, since the AzureAD ClientID is necessary to establish ADAL
router.get('/', function (req, res) {

    // Define object to hold environmental variables
    var data = {
        aad_client_id: null,
        appinsights_instrumentationkey: null
    };

    // Add AAD if present
    if (process.env.AAD_CLIENT_ID) {
        data.aad_client_id = process.env.AAD_CLIENT_ID;
    }

    // Add App Insights if present
    if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
        data.appinsights_instrumentationkey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
    }

    // Return data 
    res.json(data);
    
});

module.exports = router;