var config = require('../config');
var sendGrid = require('sendgrid')(config.sendGrid.username, config.sendGrid.password);

function emailIsValid(email) {
    return /^[^ @]+@[^ @]+\.[^ @]+$/.test(email);
}

function messageIsValid(message) {
    return message && message.replace(' ', '').length;
}

function nameIsValid(name) {
    return name && name.replace(' ', '').length;
}

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
        if (!nameIsValid(name)) {
            name = 'Anonymous';
        }

        if (!email) {
            email = 'noreply@cssoc.co.uk';
        } else if (!emailIsValid(email)) {
            return 'Email address "' + email + '" is not valid.';
        }

        if (!messageIsValid(message)) {
            return 'Please provide a message.';
        }

        sendMessage(name, email, message);

        return 'Your message has been received.';
    }
};