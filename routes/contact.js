module.exports = function(app, config) {
    app.get("/contact", function(req, res) {
        res.sendFile(config.project.path + "/contact.html");
    });
}