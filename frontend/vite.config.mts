import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: '/',
	preview: {
		port: 3000
	},
	server: {
		port: 3000,
		open: true
	}
});
