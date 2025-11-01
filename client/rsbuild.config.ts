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
  
  server: {
    port: 5173
   
  },
  
});