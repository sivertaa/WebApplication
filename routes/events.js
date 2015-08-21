var eventService = require("../services/event-service");

module.exports = function(app) {
    app.get("/events", function(req, res) {
        res.render("events", eventService.getAll());
    });
};