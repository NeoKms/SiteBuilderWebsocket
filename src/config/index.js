const {env} = process;

const config = {};

config.PRODUCTION = String(env.PRODUCTION || false).toLowerCase() == "true"

//only dev//
if (!config.PRODUCTION) {
    const dotenv = require('dotenv');
    dotenv.config();
}
//

config.PORT = env.PORT

config.REDIS = {
    HOST: env.REDIS_HOST,
    PORT: env.REDIS_PORT,
    SECRET: 'W*W(7fhsjDK&A*Eh',
    KEY: 'connect.sid',
};

config.COOKIE_DOMAIN = env.COOKIE_DOMAIN;

module.exports = config;
