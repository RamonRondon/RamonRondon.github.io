import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: {
      ignored: ['**/src/assets/*.crdownload', '**/src/assets/*.mp4', '**/posts/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        blog: './blog.html',
        post: './post.html',
        admin: './admin.html',
      },
    },
  },
});
