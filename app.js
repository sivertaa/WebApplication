var express = require('express');
var config = require('./config');
var app = express();

// Sets Jade as the template engine.
app.set('view engine', 'jade');

// Makes the assets directory public.
app.use('/assets', express.static('assets'));

// Maps the routes.
require('./routes')(app);

// Starts the server.
app.listen(config.server.port);