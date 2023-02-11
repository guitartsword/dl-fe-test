import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['vitest.setup.ts'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
});
