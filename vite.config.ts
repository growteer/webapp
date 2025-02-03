import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { sveltekit } from '@sveltejs/kit/vite';

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
		sveltekit()
	],

	resolve: {
		alias: {
			'@apollo/client': '@apollo/client/core/index.js'
		}
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'happy-dom',
		outputFile: 'reports/junit-report.xml',
		reporters: ['default', 'junit'],
		coverage: {
			all: true,
			enabled: true,
			exclude: ['src/**/*.{config,d,spec,test}.{js,ts}', '**/generated/**/*'],
			provider: 'v8',
			reporter: ['lcov', 'text'],
			reportsDirectory: 'reports/coverage'
		}
	}
});
