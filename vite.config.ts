import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  optimizeDeps: {
    exclude: ['jest', 'testing-library'],
  },
  plugins: [
    react(),
    federation({
      name: 'currencyConverter',
      filename: 'currencyConverter.js',
      exposes: {
        './App': './src/App',
        './CurrencyConverter': './src/components/currencyConverter/CurrencyConverter.tsx',
        './CurrencyPicker':'./src/components/currencyPicker/CurrencyPicker.tsx',
        './Select':'./src/components/select/Select.tsx',

      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    manifest: true,
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5001, 
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
});