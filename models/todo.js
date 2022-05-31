const mongoose = require("mongoose");
const Joi = require("joi");

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    task: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })
);

// function for validating user input
function validateTodo(todo) {
  const schema = Joi.object({
    task: Joi.string().min(1).required().trim(),
    completed: Joi.boolean(),
  });
  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;
