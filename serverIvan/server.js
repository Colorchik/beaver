require('dotenv').config();

const fastify = require("fastify")({
  logger: true,
});

const { connectDB } = require('./db/mongodb');
const todosRoutes = require("./router/todo.router");

fastify.register(require('@fastify/cors'), {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

fastify.register(require('@fastify/sensible'))
fastify.register(require('@fastify/cookie'));
fastify.register(todosRoutes);

fastify.get('/', async (request, reply) => {
  return "Hello, world!"
});

const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: 3000 });
    console.log("Server started on PORT:", fastify.server.address().port);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();