var express = require("express");
var config = require("./config");
var app = express();

// Makes the assets directory public.
app.use("/assets", express.static("assets"));

// Maps the routes.
require("./routes")(app, config);

// Starts the server.
var server = app.listen(config.server.port, function() {
    var host = server.address().address;
    var port = server.address().port;
});