import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         '@': '/src'
      }
   },
   server: {
      host: 'localhost',
      port: 9999,
      proxy: {
         '/api': 'http://api-driver.marsview.cc'
      }
   },
   plugins: [react()]
});
