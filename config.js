module.exports = {
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        accessToken: process.env.FACEBOOK_APP_ID + '|' + process.env.FACEBOOK_APP_SECRET,
        query: {
            limit: 30,
            since: '2015-01-01',
            interval: 30 // In minutes.
        }
    },
    server: {
        port: process.env.PORT || 3000
    }
};