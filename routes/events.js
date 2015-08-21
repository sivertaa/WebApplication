var facebook = require("fb");

module.exports = function(app, config) {
    // Required to query Facebook.
    facebook.setAccessToken(config.facebook.accessToken);

    app.get("/events", function(req, res) {
        res.render("events");
    });

    app.get("/events/json", function(req, res) {
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
}