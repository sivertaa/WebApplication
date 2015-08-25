var fs = require('fs');
var galleryPath = './assets/images/gallery/';
var albums = loadAlbums();

function removeExtension(file) {
    var extensionStartIndex = file.lastIndexOf('.');

    if (extensionStartIndex >= 0) {
        // Removes the file extension.
        file = file.substring(0, extensionStartIndex);
    }

    return file;
}

// Gets a list of every photo in an album.
function getPhotoFileNames(albumId) {
    return fs.readdirSync(galleryPath + albumId)
        .filter(function(file) {
            // Eliminates files with '*.*.*' names.
            return file.replace('.', '').length
                - file.replace('.', '').replace('.', '').length == 0;
        });
}

function getPhotoIds(albumId) {
    return getPhotoFileNames(albumId).map(removeExtension);
}

// Gets a list of every album in the gallery. The id coincides with the directory name.
function getAlbumIds() {
    return fs.readdirSync(galleryPath)
        .filter(function(file) {
            return fs.statSync(galleryPath + file).isDirectory();
        });
}

function getAlbumConfig(albumId) {
    var albumConfigPath = galleryPath + albumId + '/.config.json';

    try {
        return require('.' + albumConfigPath);
    } catch (error) {
        // This album does not have a config file. Return an empty object.
        return {}; 
    }
}

// Loads the albums from the gallery directory.
function loadAlbums() {
    var albums = {};
    var albumIds = getAlbumIds();

    // Populates the 'albums' dictionary.
    albumIds.forEach(function(albumId) {
        albums[albumId] = getAlbumConfig(albumId);
    });

    albums = fillEmptyProperties(albums);

    return sortAlbums(albums);
}

// Writes default values in empty properties.
function fillEmptyProperties(albums) {
    // Creates a deep copy of 'albums' to prevent side effects.
    var formattedAlbums = JSON.parse(JSON.stringify(albums));

    for (var albumId in formattedAlbums) {
        var album = formattedAlbums[albumId];

        album.id = albumId;

        if (!album.hasOwnProperty('name')) {
            album.name = albumId;
        }

        if (!album.hasOwnProperty('date')) {
            album.date = Date.now();
        }

        album.photos = getPhotoIds(albumId);
    }

    return formattedAlbums;
}

// Sorts the albums by date in descending order.
function sortAlbums(albums) {
    var sortedAlbums = {};
    var albumIdDatePairs = [];

    // Maps the albums to a list of id-date pairs.
    for (var albumId in albums) {
        albumIdDatePairs[albumIdDatePairs.length] = {
            id: albumId,
            date: albums[albumId].date
        };
    }

    // Sorts the id-date pairs by date in descending order.
    albumIdDatePairs.sort(function(firstPair, secondPair) {
        return new Date(firstPair.date) < new Date(secondPair.date);
    });

    // Populates the dictionary of sorted albums.
    albumIdDatePairs.forEach(function(pair) {
        sortedAlbums[pair.id] = albums[pair.id];
    });

    return sortedAlbums;
}

module.exports = {
    getAll: function() {
        return { 'albums': albums };
    },
    get: function(albumId) {
        return albums[albumId];
    },
    assignThumbnails: function() {
        // Gets all albums which do not have a thumbnail.
        var albumsWithoutThumbnails = fs.readdirSync('./assets/images/gallery')
            .filter(function(albumId) {
                return !fs.existsSync(galleryPath + albumId + '/_.thumbnail.jpg');
            });

        albumsWithoutThumbnails.forEach(function(albumId) {
            var albumPath = galleryPath + albumId + '/';
            var albumPhotos = getPhotoFileNames(albumId);

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