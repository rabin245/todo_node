const winston = require("winston");
require("winston-mongodb");
const config = require("config");

module.exports = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({
      db: config.get("db"),
      collection: "logs",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  ],
});
