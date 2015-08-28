var desktopPhoto = document.getElementById('desktop-photo');
var mobilePhoto = document.getElementById('mobile-photo');

function initialize(albumId, photos) {
    this.albumPath = '/assets/images/gallery/' + albumId + '/';
    this.photos = photos;
    selectPhoto(photos[0]);
}

function getPhotoPath(photoId) {
    return albumPath + photoId + '.large.jpg';
}

function selectPhoto(photoId) {
    var photoPath = getPhotoPath(photoId);

    // Clears the displayed photo to indicate that it is being updated.
    desktopPhoto.src = '';
    mobilePhoto.src = '';

    // Starts loading the selected photo.
    this.selectedPhotoId = photoId;
    desktopPhoto.src = photoPath;
    mobilePhoto.src = photoPath;
}

function selectPrevious() {
    var photoIndex = photos.indexOf(this.selectedPhotoId);

    if (photoIndex == 0) {
        selectPhoto(photos[photos.length - 1]);
    } else {
        selectPhoto(photos[photoIndex - 1]);
    }
}

function selectNext() {
    var photoIndex = photos.indexOf(this.selectedPhotoId);

    if (photoIndex == photos.length - 1) {
        selectPhoto(photos[0]);
    } else {
        selectPhoto(photos[photoIndex + 1]);
    }
}

document.onkeydown = function(e) {
    if (e.keyCode == '37') {
        // The left arrow key has been pressed.
        selectPrevious();
    } else if (e.keyCode == '39') {
        // The right arrow key has been pressed.
        selectNext();
    }
}