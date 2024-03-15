import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Adicione outros aliases conforme necessário
    },
  },
  // Outras configurações do Vitest...
});