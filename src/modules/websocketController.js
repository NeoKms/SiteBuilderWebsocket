const logger = require("./logger");
const ioSession = require("express-socket.io-session");

module.exports.start = function (server, middleware) {
  const io = require("socket.io")(server);
  io.use(ioSession(middleware, {
    autoSave:true
  }));

  io.use((socket, next) => {
    try {
      if (!socket?.handshake?.session?.passport?.user) {
        throw new Error("not authenticated");
      }
      next();
    } catch (err) {
      logger.info(`${err.message}, ip: ${socket?.request?.connection?.remoteAddress}`);
      next(err);
    }
  });

  io.on("connection", (client) => {
    const { user } = client.handshake.session.passport;
    logger.info(`client is connect: ${JSON.stringify(user)}`);
    client.on("disconnect", () => {
      logger.info("client is disconnect");
    });
    if (user.rights && user.rights.sites===2) {
      client.on("builder", (data) => {
        logger.debug("builder");
        io.to("sites").emit("builder",data);
      });
      logger.info(`client: "${user.name}" join to room sites`);
      client.join("sites");
    }
  });
};
