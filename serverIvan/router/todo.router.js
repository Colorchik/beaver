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
    fastify.get('/todos/:id', getTodo);
    fastify.post('/todos', createTodo);
    fastify.put('/todos/:id', updateTodo);
    fastify.patch('/todos/:id/toggle', toggleTodo);
    fastify.delete('/todos/:id', deleteTodo);
}

module.exports = todosRoutes;