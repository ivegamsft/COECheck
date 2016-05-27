module.exports = function () {

    // If an AppInsights env variable is present then configure the app to use AppInsights
    if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
        console.info('App Insights environmental variable detected');
        console.info('Configuring Application Insights');
        var appInsights = require("applicationinsights");
        appInsights.setup().start();
    }
    else {
        console.log('No App Insights environmental variable detected');
    }

};