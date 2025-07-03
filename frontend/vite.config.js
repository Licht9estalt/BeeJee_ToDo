import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
	// 		target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
	// 		sourcemap: !isProdStand,
	// 		outDir: path.resolve(__dirname, 'build')
	// 	},
		base: '/',
		preview: {
			port: 3000
		},
		server: {
			port: 3000,
			open: true
		}
})
