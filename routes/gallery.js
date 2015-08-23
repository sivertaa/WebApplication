var gallery = require('../assets/json/gallery/gallery.json');

module.exports = function(app) {
    app.get('/gallery', function(req, res) {
        res.render('gallery', gallery);
    });

    app.get('/gallery/:albumTag', function(req, res) {
    	var albumTag = req.params.albumTag;
    	var album = gallery.albums[albumTag];

        res.render('gallery/album', album);
    });
};