const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controller/todo.controller");

async function todosRoutes(fastify, options) {
    fastify.get('/todos', getTodos);
    fastify.get('/todos/:id', getTodo);
    fastify.post('/todos', createTodo);
    fastify.put('/todos/:id', updateTodo);
    fastify.delete('/todos/:id', deleteTodo);
}

module.exports = todosRoutes;