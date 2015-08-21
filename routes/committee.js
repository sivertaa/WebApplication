module.exports = function(app, config) {
    app.get("/committee", function(req, res) {
        res.render("committee", { title: "Computer Science Society" });
    });
}