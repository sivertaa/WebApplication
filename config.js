module.exports = {
    email: {
        contact: process.env.CONTACT_EMAIL,
        noreply: process.env.NOREPLY_EMAIL
    },
    facebook: {
        accessToken: process.env.FACEBOOK_ACCESS_TOKEN, // Must be updated every other month.
        query: {
            limit: 30,
            since: '2015-01-01',
            interval: 30 // In minutes.
        }
    },
    sendGrid: {
        username: process.env.SENDGRID_USERNAME,
        password: process.env.SENDGRID_PASSWORD
    },
    server: {
        port: process.env.PORT || 3000
    }
};