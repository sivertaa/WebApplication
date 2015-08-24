var gallery = require('../assets/json/gallery/gallery.json');

module.exports = function(app) {
    app.get('/gallery', function(req, res) {
        res.render('gallery', gallery);
    });

    app.get('/gallery/:albumId', function(req, res) {
    	var albumId = req.params.albumId;
    	var album = gallery.albums[albumId];

    	album.id = albumId;
        res.render('gallery/album', album);
    });
};