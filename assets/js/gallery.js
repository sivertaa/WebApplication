function selectPhoto(albumId, photoId) {
    var photoPath = '/assets/images/gallery/' + albumId + '/' + photoId + '.large.jpg';
    var desktopPhoto = document.getElementById('desktop-photo');
    var mobilePhoto = document.getElementById('mobile-photo');

    desktopPhoto.src = photoPath;
    mobilePhoto.src = photoPath;
}