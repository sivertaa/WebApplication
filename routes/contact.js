module.exports = function(app, config) {
    app.get("/contact", function(req, res) {
        res.render("contact");
    });
}