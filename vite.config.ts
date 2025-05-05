import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

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
        './AppWrapper': './src/components/appWrapper/AppWrapper',
        './App': './src/App',
        './CurrencyConverter': './src/components/currencyConverter/CurrencyConverter',
        './CurrencyPicker':'./src/components/currencyPicker/CurrencyPicker',
        './Select':'./src/components/select/Select',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit'],
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5001, 
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
});