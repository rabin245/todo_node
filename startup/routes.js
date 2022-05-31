const express = require("express");
const todos = require("../routes/todos");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/todos", todos);
  app.use(error);
};
