var facebook = require('fb');
var config = require('../config');
var dateService = require('../services/date-service');
var events = [];

function queryEvents() {
    // Required to query Facebook.
    facebook.setAccessToken(config.facebook.accessToken);

    facebook.api('cssoc.man/events', function(response) {
        if (!response || response.error) {
            console.log(!response ? 'An error has occurred.' : response.error);
            
            return;
        }

        // Parses the response into a more compact format.
        return response['data'].map(function(data) {
            return {
                id: data['id'],
                img: data['picture']['data']['url'],
                name: data['name'],
                location: data['place'] ? data['place']['name'] : '',
                date: dateService.parse(data['start_time'])
            };
        });
    }, {
        fields: [ 'id', 'name', 'place', 'start_time', 'picture'],
        limit: config.facebook.query.limit,
        since: config.facebook.query.since
    });
}

// Queries the events when the server starts.
queryEvents();

// Periodically updates the events.
setInterval(function() {
    queryEvents();
}, config.facebook.query.interval * 60000);

module.exports = {
    getAll: function() {
        return { 'events': events };
    }
};