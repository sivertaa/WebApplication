var bodyParser = require('body-parser');
var express = require('express');
var config = require('./config');
var app = express();

// Enables support for urlencoded POST requests.
app.use(bodyParser.urlencoded({ extended: false }));

// Sets the directory of this file as the root.
app.locals.basedir = __dirname;

// Sets Jade as the template engine.
app.set('view engine', 'jade');

// Makes the assets directory public.
app.use('/assets', express.static('assets'));

// Maps the routes.
require('./routes')(app);

// Error handling.
app.use(function(err, req, res, next) {
    res.render('error', { message: err.message });
});

// Starts the server.
app.listen(config.server.port);