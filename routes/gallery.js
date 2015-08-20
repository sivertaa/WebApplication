module.exports = function(app, config) {
    app.get("/gallery", function(req, res) {
        res.sendFile(config.path.views + "/gallery.html");
    });
}