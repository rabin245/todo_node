const mongoose = require("mongoose");
const config = require("config");
const logger = require("../middleware/logger");

module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => logger.info("Connected to MongoDB"))
    .catch((err) => logger.error("Could not connect to MongoDB", err));
};
