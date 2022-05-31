const mongoose = require("mongoose");
const config = require("config");
const logger = require("../middleware/logger");

module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      logger.info("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB", err);
      logger.error("Could not connect to MongoDB", err);
    });
};
