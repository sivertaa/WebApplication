var committee = require('../assets/json/committee.json');

module.exports = function(app) {
    app.get('/committee', function(req, res) {
        res.render('committee', committee);
    });
};