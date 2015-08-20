module.exports = function(app, config) {
    app.get("/contact", function(req, res) {
        res.sendFile(config.path.views + "/contact.html");
    });
}