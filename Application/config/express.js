var morgan = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

module.exports = function (app, express) {

    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(favicon('./public/favicon.ico'));

};