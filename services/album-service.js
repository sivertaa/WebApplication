var fs = require('fs');
var galleryPath = './assets/images/gallery/';

function removeExtension(file) {
    var extensionStartIndex = file.lastIndexOf('.');

    if (extensionStartIndex >= 0) {
        // Removes the file extension.
        file = file.substring(0, extensionStartIndex);
    }

    return file;
}

function getGallery() {
    return require('../assets/json/gallery/gallery.json');
}

// Gets a list of every photo in an album.
function getPhotoPaths(albumId) {
    return fs.readdirSync(galleryPath + albumId)
        .filter(function(photo) {
            // Eliminates photos with '*.*.*' names.
            return photo.replace('.', '').length
                - photo.replace('.', '').replace('.', '').length == 0;
        });
}

module.exports = {
    loadPhotos: function() {
        var gallery = getGallery();

        for (var albumId in gallery.albums) {
            var album = gallery.albums[albumId];

            album.photos = getPhotoPaths(albumId).map(removeExtension);
        }

        // Updates the source file.
        fs.writeFile('assets/json/gallery/gallery.json', JSON.stringify(gallery, null, 4));
    },
    assignThumbnails: function() {
        // Gets all albums which do not have a thumbnail.
        var albumsWithoutThumbnails = fs.readdirSync('./assets/images/gallery')
            .filter(function(album) {
                return !fs.existsSync(galleryPath + album + '/_.thumbnail.jpg');
            });

        albumsWithoutThumbnails.forEach(function(album) {
            var albumPath = galleryPath + album + '/';
            var albumPhotos = getPhotoPaths(album);

            if (!albumPhotos || !albumPhotos.length) {
                throw 'Albums cannot be empty.';
            }

            // Randomly selects a photo.
            var photo = albumPhotos[Math.floor(Math.random() * albumPhotos.length)];

            // Creates the thumbnail as a copy of this photo.
            fs.createReadStream(albumPath + photo)
                .pipe(fs.createWriteStream(albumPath + '_.thumbnail.jpg'));
        });
    }
};