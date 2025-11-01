const prisma = require('../prisma/client');
const { getDB } = require('../db/mongodb');
const mongoose = require('mongoose');

exports.getTodos = async (req, reply) => {
  try {
    const db = getDB();
    const todosCollection = db.collection('todos');
    const todos = await todosCollection.find({}).toArray();
    
    const formattedTodos = todos.map(todo => ({
      id: todo._id.toString(),
      text: todo.text,
      done: todo.done || false,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
    
    reply.send(formattedTodos);
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
    const body = req.body;
    
    if (!body) {
      return reply.status(400).send({ message: "Тело запроса пустое." });
    }
    
    const text = body.text || body.title || body.content || (typeof body === 'string' ? body : null);
    
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return reply.status(400).send({ message: "Text обязателен и не может быть пустым." });
    }
    
    const db = getDB();
    const todosCollection = db.collection('todos');
    
    const newTodoData = {
      text: text.trim(),
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await todosCollection.insertOne(newTodoData);
    const newTodo = {
      id: result.insertedId.toString(),
      _id: result.insertedId,
      text: newTodoData.text,
      done: newTodoData.done,
      createdAt: newTodoData.createdAt,
      updatedAt: newTodoData.updatedAt,
    };
    
    reply.status(201).send(newTodo);
  } catch (err) {
    reply.status(400).send({ message: err.message || "Произошла ошибка при создании задачи." });
  }
};

exports.updateTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return reply.status(400).send({ message: "Text обязателен и не может быть пустым." });
    }
    
    const db = getDB();
    const todosCollection = db.collection('todos');
    
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (err) {
      return reply.status(400).send({ message: "Неверный формат ID." });
    }
    
    const result = await todosCollection.findOneAndUpdate(
      { _id: objectId },
      { 
        $set: { 
          text: text.trim(),
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return reply.status(404).send({ message: "Задача не найдена." });
    }
    
    const updatedTodo = {
      id: result.value._id.toString(),
      ...result.value,
      createdAt: result.value.createdAt,
      updatedAt: result.value.updatedAt,
    };
    
    reply.send(updatedTodo);
  } catch (err) {
    reply.status(400).send({ message: err.message || "Произошла ошибка при обновлении задачи." });
  }
};

exports.toggleTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    
    const db = getDB();
    const todosCollection = db.collection('todos');
    
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (err) {
      return reply.status(400).send({ message: "Неверный формат ID." });
    }
    
    const currentTodo = await todosCollection.findOne({ _id: objectId });
    
    if (!currentTodo) {
      return reply.status(404).send({ message: "Задача не найдена." });
    }
    
    const newDoneValue = !currentTodo.done;
    
    const result = await todosCollection.findOneAndUpdate(
      { _id: objectId },
      { 
        $set: { 
          done: newDoneValue,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return reply.status(404).send({ message: "Задача не найдена после обновления." });
    }
    
    const updatedTodo = {
      id: result.value._id.toString(),
      text: result.value.text,
      done: result.value.done,
      createdAt: result.value.createdAt,
      updatedAt: result.value.updatedAt,
    };
    
    reply.send(updatedTodo);
  } catch (err) {
    reply.status(400).send({ message: err.message || "Произошла ошибка при переключении задачи." });
  }
};

exports.deleteTodo = async (req, reply) => {
  try {
    const id = req.params.id;
    
    const db = getDB();
    const todosCollection = db.collection('todos');
    
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (err) {
      return reply.status(400).send({ message: "Неверный формат ID." });
    }
    
    const result = await todosCollection.deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return reply.status(404).send({ message: "Задача не найдена." });
    }

    reply.send({ message: "Задача успешно удалена." });
  } catch (err) {
    reply.status(500).send({ message: err.message || "Произошла ошибка при удалении задачи." });
  }
};