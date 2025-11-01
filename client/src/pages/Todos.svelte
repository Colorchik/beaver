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
    todos = await ky.get('/todos').json();
  };

  onMount(fetchTodos);

  const { form } = createForm({
    onSubmit: async (values: { text: string }) => {
      await ky.post('/todos', { json: values });
      await fetchTodos();
    },
  });

  const toggle = async (id: string) => {
    await ky.patch(`/todos/${id}/toggle`);
    await fetchTodos();
  };

  const remove = async (id: string) => {
    await ky.delete(`/todos/${id}`);
    await fetchTodos();
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