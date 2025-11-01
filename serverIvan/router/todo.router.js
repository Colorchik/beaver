const {
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo
} = require("../controller/todo.controller");

async function todosRoutes(fastify, options) {
    fastify.get('/todos', getTodos);
    fastify.post('/todos', createTodo);
    fastify.patch('/todos/:id/toggle', toggleTodo);
    fastify.delete('/todos/:id', deleteTodo);
}

module.exports = todosRoutes;