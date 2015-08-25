var albumService = require('../services/album-service');

module.exports = function(app) {
    app.get('/gallery', function(req, res) {
        res.render('gallery', albumService.getAll());
    });

    app.get('/gallery/:albumId', function(req, res) {
        var albumId = req.params.albumId;
        var album = albumService.get(albumId);

        res.render('gallery/album', album);
    });
};