var fs = require('fs');
var eventService = require('../services/event-service');

module.exports = function(app) {
    // Maps the root route.
    app.get('/', function(req, res) {
        res.render('index', eventService.getUpcoming());
    });

    // Dynamically includes every route from this directory.
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == 'index.js') {
            return;
        }

        var name = file.substr(0, file.indexOf('.'));

        require('./' + name)(app);
    });

    // Catch-all route.
    app.get('*', function(req, res) {
        throw new Error('Page not found.');
    });
};