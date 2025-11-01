<script lang="ts">
  import { createForm } from 'felte';
  import ky from 'ky';
  import { onMount } from 'svelte';
  import TodoItem from '../components/TodoItem.svelte';

  interface Todo {
    id: string;
    text: string;
    done: boolean;
  }

  let todos: Todo[] = [];

  const fetchTodos = async () => {
    todos = await ky.get('http://localhost:3000/todos', {
      credentials: "include"
    }).json();
  };

  onMount(fetchTodos);

  const { form } = createForm({
    onSubmit: async (values: { text: string }) => {
      await ky.post('http://localhost:3000/todos', { 
        json: values,
        credentials: "include"
      });
      await fetchTodos();
    },
  });

  const toggle = async (id: string) => {
    await ky.patch(`http://localhost:3000/todos/${id}/toggle`, {
      credentials: "include"
    });
    await fetchTodos();
  };

  const remove = async (id: string) => {
    try {
      await ky.delete(`http://localhost:3000/todos/${id}`, {
        credentials: "include"
      });
      await fetchTodos();
    } catch (err: any) {
      console.error('Error deleting todo:', err);
      alert('Ошибка при удалении задачи: ' + (err.message || 'Неизвестная ошибка'));
    }
  };
</script>

<h1>My Tasks 📝</h1>

<form use:form>
  <input name="text" placeholder="New task..." required />
  <button type="submit">Add</button>
</form>

<ul>
  {#each todos as todo (todo.id)}
    <TodoItem {todo} on:toggle={() => toggle(todo.id)} on:remove={() => remove(todo.id)} />
  {/each}
</ul>
  
<style>
  form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
</style>