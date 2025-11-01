require('dotenv').config();

const fastify = require("fastify")();
const config = require("./server.config");

const todosRoutes = require("./router/todo.router");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Подключились к Монго..."))
  .catch(err => console.error("Ошибка c Монго", err));

fastify.register(config);

fastify.register(todosRoutes);

fastify.get('/', async (request, reply) => {
  return "Hello, world!"
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server started on PORT:", fastify.server.address().port);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();