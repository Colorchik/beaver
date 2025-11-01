import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';

export default defineConfig({
  plugins: [
    pluginSvelte({
      svelteLoaderOptions: {
        compilerOptions: {
          compatibility: { componentApi: 4 }, // для Svelte 5 с new App()
        },
      },
    }),
  ],
  source: {
    entry: {
      main: './src/index.ts',
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3000' },
    historyFallback: true, // 👈 добавляем fallback на index.html
  },
  build: {
    outDir: 'dist',
  },
});