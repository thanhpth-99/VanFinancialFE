import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tsconfigPathsPlugin(), tailwindcss()],
    server: {
        port: 1686
    }
})
