function sendMessage(name, email, message) {
    // TO-DO.
}

module.exports = {
    send: function(name, email, message) {
        if (!message) {
            return 'Please provide a message.';
        }

        sendMessage(name, email, message);

        return 'Your message has been received.';
    }
};