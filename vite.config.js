import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
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
