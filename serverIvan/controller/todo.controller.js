const prisma = require('../prisma/client');

exports.getTodos = async (req, reply) => {
  try {
    const todos = await prisma.todos.findMany();
    reply.send(todos);
  } catch (err) {
    reply.status(500).send({ message: err.message || "Произошла ошибка при получении задач." });
  }
};

exports.getTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    const todo = await prisma.todos.findUnique({
      where: { id: id }
    });
    
    if (!todo) {
      return reply.status(404).send({ message: "Задача не найдена." });
    }
    reply.send(todo);
  } catch (err) {
    reply.status(500).send({ message: err.message || "Произошла ошибка при получении задачи." });
  }
};

exports.createTodo = async (req, reply) => {
  try {
    const { title, content } = req.body;
    const newTodo = await prisma.todos.create({
      data: {
        title: title,
        content: content,
      }
    });
    reply.status(201).send(newTodo);
  } catch (err) {
    reply.status(400).send({ message: err.message || "Произошла ошибка при создании задачи." });
  }
};

exports.updateTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    
    const updatedTodo = await prisma.todos.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
      }
    });

    reply.send(updatedTodo);
  } catch (err) {
    if (err.code === 'P2025') {
      return reply.status(404).send({ message: "Задача не найдена." });
    }
    reply.status(400).send({ message: err.message || "Произошла ошибка при обновлении задачи." });
  }
};

exports.deleteTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    await prisma.todos.delete({
      where: { id: id }
    });

    reply.send({ message: "Задача успешно удалена." });
  } catch (err) {
    if (err.code === 'P2025') {
      return reply.status(404).send({ message: "Задача не найдена." });
    }
    reply.status(500).send({ message: err.message || "Произошла ошибка при удалении задачи." });
  }
};