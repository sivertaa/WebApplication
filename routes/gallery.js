module.exports = function(app, config) {
    app.get("/gallery", function(req, res) {
        res.sendFile(config.project.path + "/gallery.html");
    });
}