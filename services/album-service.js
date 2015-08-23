var fs = require('fs');

function getPhotoNames(albumName) {
	fs.readdirSync('./assets/images/gallery/' + albumName)
		.filter(function(photoName) {
			// Eliminates photos with '*.*.*' names.
			return photoName.replace('.', '').length
				- photoName.replace('.', '').replace('.', '').length == 0;
		})
	);
}

// TO-DO.
function loadPhotos(albums) {
	return albums;
}

// TO-DO.
module.exports = {

};