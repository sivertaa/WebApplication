var desktopPhoto = document.getElementById('desktop-photo');
var mobilePhoto = document.getElementById('mobile-photo');

function selectPhoto(albumId, photoId) {
    var photoPath = '/assets/images/gallery/' + albumId + '/' + photoId + '.large.jpg';

    // Clears the displayed photo to indicate that it is being updated.
    desktopPhoto.src = '';
    mobilePhoto.src = '';

    // Starts loading the selected photo.
    desktopPhoto.src = photoPath;
    mobilePhoto.src = photoPath;
}