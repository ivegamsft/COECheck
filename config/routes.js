module.exports = function (app) {

    app.use('/api/assessments', require('../routes/assessments'));
    app.use('/api/groups', require('../routes/groups'));
    app.use('/api/schema', require('../routes/schema'));

    // Use the API routes from above, & use /static for serving html & js
    app.use(function (req, res, next) {
        res.status(404).send('Nothing at this URL...');
    });

};