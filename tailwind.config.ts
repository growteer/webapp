import type { Config } from 'tailwindcss';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],

	plugins: [
		skeleton({
			themes: [themes.mint, themes.legacy, themes.terminus, themes.wintry, themes.sahara]
		})
	],

	theme: {
		extend: {}
	}
} satisfies Config;
