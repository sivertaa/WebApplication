module.exports = function(app) {
    app.get('/committee', function(req, res) {
        res.render('committee');
    });
};