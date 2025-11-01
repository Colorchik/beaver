const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} = require("../controller/todo.controller");

async function todosRoutes(fastify, options) {
    fastify.get('/todos', getTodos);
    fastify.post('/todos', createTodo);
    fastify.patch('/todos/:id/toggle', toggleTodo);
    fastify.get('/todos/:id', getTodo);
    fastify.put('/todos/:id', updateTodo);
    fastify.delete('/todos/:id', deleteTodo);
}

module.exports = todosRoutes;