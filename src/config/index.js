const {env} = process;

const PRODUCTION = String(env.PRODUCTION || false).toLowerCase() == "true"

//only dev//
if (!PRODUCTION) {
    const dotenv = require('dotenv');
    dotenv.config();
}
//

const PORT = env.PORT

const REDIS = {
    HOST: env.REDIS_HOST,
    PORT: env.REDIS_PORT,
    SECRET: 'W*W(7fhsjDK&A*Eh',
    KEY: 'connect.sid',
};

module.exports = {
    PORT,
    REDIS,
};
