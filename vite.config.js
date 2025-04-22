import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    optimizeDeps: {
        include: ['vuex']
    },
    resolve: {
        alias: {
            'vuex': 'vuex/dist/vuex.esm-bundler.js'
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
});
