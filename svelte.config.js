import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    files: {
      assets: 'static',
      lib: 'src/lib',
      routes: 'src/routes'
    },
    prerender: {
      entries: ['*']
    }
  }
};