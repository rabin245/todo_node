const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27047/todos",
      collection: "logs",
    }),
  ],
});
