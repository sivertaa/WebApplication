module.exports = {
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        accessToken: process.env.FACEBOOK_APP_ID + "|" + process.env.FACEBOOK_APP_SECRET
    },
    server: {
        port: process.env.PORT || 3000
    }
};