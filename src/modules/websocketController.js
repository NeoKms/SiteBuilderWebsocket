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

    io.on('connection', (socket) => {
        const { user } = socket.handshake;
        logger.info(`Socket is connect: ${JSON.stringify(socket.handshake.user)}`);
        socket.on('disconnect', () => {
            logger.info('Socket is disconnect');
        });
        socket.on('builder', (data) => {
            logger.debug('builder');
            io.emit('builder', data);
        });
    });
};
