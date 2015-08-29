var facebook = require('fb');
var config = require('../config');
var dateService = require('../services/date-service');
var events = [];

// Parses the response into a more compact format.
function getEventsFromResponse(response) {
    return response['data'].map(function(data) {
        return {
            id: data['id'],
            img: data['picture']['data']['url'],
            name: data['name'],
            location: data['location'] ? data['location'] : '',
            date: dateService.parse(data['start_time']),
            upcoming: new Date(data['start_time']) > Date.now()
        };
    });
}

function queryEvents() {
    // Required to query Facebook.
    facebook.setAccessToken(config.facebook.accessToken);

    facebook.api('954776951241538/events', function(response) {
        if (!response || response.error) {
            console.log(!response ? 'An error has occurred.' : response.error);
            
            return;
        }

        events = getEventsFromResponse(response);
    }, {
        fields: [ 'id', 'name', 'location', 'start_time', 'picture' ],
        limit: config.facebook.query.limit,
        since: config.facebook.query.since
    });
}

function getFutureEvents() {
    if (!events || !events.length) {
        return [];
    }

    return events.filter(function(event) {
        return event.upcoming;
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
    },
    getUpcoming: function() {
        var futureEvents = getFutureEvents();

        if (!futureEvents.length) {
            return {};
        }

        return { 'event': futureEvents[futureEvents.length - 1] };
    }
};