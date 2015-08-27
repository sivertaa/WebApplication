var contactService = require('../services/contact-service');

module.exports = function(app) {
    app.get('/contact', function(req, res) {
        res.render('contact');
    });

    app.post('/contact', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;
        var response = contactService.send(name, email, message);

        res.render('contact/submit-message', { message: response });
    });
};