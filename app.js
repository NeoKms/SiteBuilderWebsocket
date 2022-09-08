const express = require("express");
const config = require("./src/config");
const logger = require("./src/modules/logger");
const cookieParser = require("cookie-parser");
const websockets = require("./src/modules/websocketController");

const app = express();
app
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, X-Requested-With, Access-Control-Allow-Origin, Set-Cookie");
    next();
  })
  .use(cookieParser());
let middleware = require("./src/modules/residAuth")(app);
var server = app.listen(config.PORT, function () {
  logger.info("Server is listening on port %d", server.address().port);
});
websockets.start(server, middleware);
