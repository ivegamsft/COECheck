module.exports = function (app) {

    // Custom routes
    app.use('/api/assessments', require('../routes/assessments'));
    app.use('/api/groups', require('../routes/groups'));
    app.use('/api/schema', require('../routes/schema'));
    app.use('/api/environment', require('../routes/environment'));
    app.use('/api/documentation', require('../routes/documentation'));

    // 404
    app.use(function (req, res, next) {
        res.status(404).send('No content could be located at this URL.');
    });

};