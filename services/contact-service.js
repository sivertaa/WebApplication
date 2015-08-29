var config = require('../config');
var sendGrid = require('sendgrid')(config.sendGrid.username, config.sendGrid.password);

function sendMessage(name, email, message) {
    var payload = {
        to: 'cssoc.manchester@gmail.com',
        from: email,
        subject: name,
        text: message
    };

    sendGrid.send(payload, function(error, response) {
        if (error) {
            console.error(error);
        }
    });
}

module.exports = {
    send: function(name, email, message) {
        if (!message) {
            return 'Please provide a message.';
        }

        if (!name) {
            name = 'anonymous';
        }

        if (!email) {
            // TO-DO: Improve email address validation.
            email = 'anonymous';
        }

        sendMessage(name, email, message);

        return 'Your message has been received.';
    }
};