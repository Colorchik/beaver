const fastify = require("fastify")();
const config = require("./server.config");

fastify.register(config);

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