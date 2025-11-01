const cors = require("@fastify/cors");
const cookie = require("@fastify/cookie");

module.exports = async (fastify, options) => {

  try {
    await fastify.register(cors, {
      origin: ["http://localhost:3000"],
      credentials: true
    });
    await fastify.register(cookie);

  } catch (err) {
    console.error("Всё сломалось:", err);
    throw err;
  }
  
};