<script lang="ts">
  export let todo: { id: string; text: string; done: boolean };
  export let toggle: () => void;
  export let remove: () => void;
</script>

<li>
  <input type="checkbox" checked={todo.done} on:change={toggle} />
  <span class:done={todo.done}>{todo.text}</span>
  <button on:click={remove}>❌</button>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
  }
  .done {
    text-decoration: line-through;
    color: gray;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: red;
  }
</style>