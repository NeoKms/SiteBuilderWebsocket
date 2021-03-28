const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const config = require('../config');
const redis = require('redis').createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
});
const session = require('express-session');
const logger = require('./logger');

module.exports.start = function (server) {
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        const handshakeData = socket.request;
        handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
        const sidCookie = handshakeData.cookies['connect.sid'];
        const sid = cookieParser.signedCookie(sidCookie, config.REDIS.SECRET);
        if (!sid) {
            logger.error('Not session found');
        }
        redis.get(`sess:${sid}`, (err, data) => {
            if (err) {
                logger.error('io.authorization -> ', err);
                next(new Error('not authorized'));
            }
            if (data) {
                socket.handshake.user = JSON.parse(data).passport.user;
                next();
            }
        });
    });

    io.on('connection', (client) => {
        const { user } = client.handshake;
        logger.info(`client is connect: ${JSON.stringify(user)}`);
        client.on('disconnect', () => {
            logger.info('client is disconnect');
        });
        if (user.rights && user.rights.sites===2) {
            client.on('builder', (data) => {
                logger.debug('builder');
                io.to('sites').emit('builder',data);
            });
            logger.info(`client: "${user.name}" join to room sites`)
            client.join('sites')
        }
    });
};
