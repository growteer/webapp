import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		nodePolyfills({
			exclude: ['fs'],
			globals: {
				Buffer: true,
				global: true,
				process: true
			},
			protocolImports: true
		}),
		tailwindcss(),
		sveltekit(),
		svelteTesting()
	],
	test: {
		globals: true,
		outputFile: 'reports/test-results.xml',
		reporters: ['default', 'junit'],
		coverage: {
			all: true,
			enabled: true,
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: ['src/**/generated/**/*'],
			provider: 'v8',
			reporter: ['text', 'lcov'],
			reportsDirectory: 'reports/coverage'
		},
		environment: 'happy-dom',
		clearMocks: true,
		include: ['src/**/*.test.ts'],
		setupFiles: ['./vitest-setup-client.ts']
	},
	resolve: {
		conditions: ['browser'],
		alias: {
			'@apollo/client': '@apollo/client/core/index.js'
		}
	}
});
