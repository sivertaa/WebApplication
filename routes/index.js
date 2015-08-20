var fs = require("fs");

// Dynamically includes every route.
module.exports = function(app, config) {
    // Maps the root route.
    app.get("/", function(req, res) {
        res.sendFile(config.project.path + "/index.html");
    });

    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") {
            return;
        }

        var name = file.substr(0, file.indexOf("."));

        require("./" + name)(app, config);
    });
}