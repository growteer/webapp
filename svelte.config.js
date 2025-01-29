import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ strict: false }),
		alias: {
			$src: '.src',
			$lib: './src/lib',
			$features: './src/lib/features',
			$services: './src/lib/services'
		}
	}
};

export default config;
