import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@root': fileURLToPath(new URL('./', import.meta.url)),
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        base: '/',
        host: '127.0.0.1',
    },
})
