const Todo = require('../models/todo.model');

exports.getTodos = async (req, reply) => {
  try {
    const todos = await Todo.find();
    reply.send(todos);
  } catch (err) {
    reply.status(500).send({ message: err.message || "Произошла ошибка при получении задач." });
  }
};

exports.getTodo = async (req, reply) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if (!todo) {
            return reply.status(404).send({ message: "Задача не найдена." });
        }
        reply.send(todo);
    } catch (err) {
        reply.status(500).send({ message: err.message || "Произошла ошибка при получении задачи." });
    }
};

exports.createTodo = async (req, reply) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const newTodo = await todo.save();
        reply.status(201).send(newTodo);
    } catch (err) {
        reply.status(400).send({ message: err.message || "Произошла ошибка при создании задачи." });
    }
};

exports.updateTodo = async (req, reply) => {
    try {
        const id = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTodo) {
            return reply.status(404).send({ message: "Задача не найдена." });
        }

        reply.send(updatedTodo);
    } catch (err) {
        reply.status(400).send({ message: err.message || "Произошла ошибка при обновлении задачи." });
    }
};

exports.deleteTodo = async (req, reply) => {
    try {
        const id = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return reply.status(404).send({ message: "Задача не найдена." });
        }

        reply.send({ message: "Задача успешно удалена." });
    } catch (err) {
        reply.status(500).send({ message: err.message || "Произошла ошибка при удалении задачи." });
    }
};