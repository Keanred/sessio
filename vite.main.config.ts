import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config
export default defineConfig({
	resolve: {
		alias: {
			'@shared': resolve(__dirname),
		},
	},
	build: {
		rollupOptions: {
			external: ['better-sqlite3'],
		},
	},
});
