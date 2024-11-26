import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';
import VueRouterAuto from 'unplugin-vue-router/vite'; // Cambia la importación para usar el plugin adecuado
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    VueRouterAuto({
      // Aquí puedes ajustar la configuración si es necesario
      pagesDir: './src/pages',  // Asegúrate de que esta ruta sea correcta
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 8080,
  },
});