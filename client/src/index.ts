import App from './App.svelte';

// Находим DOM-элемент, куда монтируем приложение
const target = document.getElementById('root');
if (!target) throw new Error('#root not found');

// Монтируем приложение
const app = new App({ target });

export default app;