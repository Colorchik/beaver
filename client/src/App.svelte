<script lang="ts">
  import Home from './pages/Home.svelte';
  import Todos from './pages/Todos.svelte';
  import About from './pages/About.svelte';

  let route = '/';

  const navigate = (path: string) => {
    route = path;
    history.pushState({}, '', path);
  };

  window.addEventListener('popstate', () => {
    route = location.pathname;
  });
</script>

<nav>
  <a href="/" on:click|preventDefault={() => navigate('/')}>🏠 Home</a>
  <a href="/todos" on:click|preventDefault={() => navigate('/todos')}>✅ Todos</a>
  <a href="/about" on:click|preventDefault={() => navigate('/about')}>ℹ️ About</a>
</nav>

<main>
  {#if route === '/'}
    <Home />
  {:else if route === '/todos'}
    <Todos />
  {:else if route === '/about'}
    <About />
  {:else}
    <h2>404 — Not found</h2>
  {/if}
</main>

<style>
  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background: #fafafa;
    border-bottom: 1px solid #ddd;
  }
  a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }
  a:hover { color: #0077ff; }
  main {
    max-width: 600px;
    margin: 2rem auto;
    font-family: sans-serif;
  }
</style>