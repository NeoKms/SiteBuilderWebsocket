const express = require('express');
const config = require('./src/config/index');
const logger = require('./src/modules/logger');
const websockets = require('./src/modules/websocketController');

const app = express();

var server = app.listen(config.PORT, function () {
    logger.info('Server is listening on port %d', server.address().port);
});
websockets.start(server);
