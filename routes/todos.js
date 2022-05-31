const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Todo, validate } = require("../models/todo");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    if (_.isEmpty(req.query)) {
      console.log("no query found");
      const todos = await Todo.find().sort("task");
      res.send(todos);
    } else {
      const completed = req.query.completed;
      const todos = await Todo.find({ completed: completed }).sort("task");
      res.send(todos);
    }
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");

    res.send(todo);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let todo = new Todo({
      task: req.body.task,
      completed: req.body.completed,
    });

    await todo.save();
    res.send(todo);
  })
);

router.patch(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          task: req.body.task,
          completed: req.body.completed,
        },
      },
      { new: true }
    );

    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");

    res.send(todo);
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    if (!todo)
      return res.status(404).send("The todo with the given ID was not found.");

    res.send(todo);
  })
);

module.exports = router;
