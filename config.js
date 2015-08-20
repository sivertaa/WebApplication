module.exports = {
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        accessToken: process.env.FACEBOOK_APP_ID + "|" + process.env.FACEBOOK_APP_SECRET
    },
    path: {
    	root: __dirname,
        views: __dirname + "/views"
    },
    server: {
        port: process.env.PORT || 3000
    }
};