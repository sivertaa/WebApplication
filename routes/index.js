var fs = require("fs");

module.exports = function(app, config) {
    // Maps the root route.
    app.get("/", function(req, res) {
        res.render("index");
    });

    // Dynamically includes every route from this directory.
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") {
            return;
        }

        var name = file.substr(0, file.indexOf("."));

        require("./" + name)(app, config);
    });
}