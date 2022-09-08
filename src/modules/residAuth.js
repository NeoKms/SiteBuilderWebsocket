const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const { REDIS } = require('../config');

const redisClient = redis.createClient({
    host: REDIS.HOST,
    port: REDIS.PORT
});

// :Middleware session REDIS
const sessionMiddleware = session({
    secret: REDIS.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 30,
        httpOnly: false,
        sameSite: 'lax',
        domain: REDIS.COOKIE_DOMAIN,
    },
    store: new RedisStore({ client: redisClient })
});
module.exports = (app) => {
    app.use(sessionMiddleware);
    passport.serializeUser((user, done) => { done(null, user) });
    passport.deserializeUser((user, done) => { done(null, user) });
    app
        .use(passport.initialize())
        .use(passport.session());
    return sessionMiddleware
}
