module.exports = function(app) {
    app.get("/gallery", function(req, res) {
        res.render("gallery");
    });
};