var config = require("./config");
var facebook = require("fb");
var express = require("express");
var app = express();

facebook.setAccessToken(config.facebook.accessToken)

app.get("/events", function(req, res) {
    facebook.api("cssoc.man/events", function(data) {
        if (!data || data.error) {
            console.log(!data ? "An error has occurred." : data.error);
            
            return;
        }

        // Returns the response as json.
        res.json(data);
    }, {
        fields: [ "id", "name", "place", "start_time", "picture"],
        limit: 140
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});