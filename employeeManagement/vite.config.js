import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
});
