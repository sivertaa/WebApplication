module.exports = function(app, config) {
    app.get("/committee", function(req, res) {
        res.sendFile(config.path.views + "/committee.html");
    });
}