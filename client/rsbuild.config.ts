import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';

export default defineConfig({
  plugins: [
    pluginSvelte({
      svelteLoaderOptions: {
        compilerOptions: {
          compatibility: { componentApi: 4 },
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
    port: 5173
   
  },
  build: {
    outDir: 'dist',
  },
});