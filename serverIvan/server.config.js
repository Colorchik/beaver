const cors = require("@fastify/cors");
const cookie = require("@fastify/cookie");

module.exports = async (fastify, options) => {

  try {
    await fastify.register(cors, {
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    });
    await fastify.register(cookie);

  } catch (err) {
    console.error("CORS configuration error:", err);
    throw err;
  }

};