module.exports = function(app, config) {
    app.get("/gallery", function(req, res) {
        res.render("gallery");
    });
}