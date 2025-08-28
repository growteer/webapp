import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

export const defaultLocale = 'en';

// Register the locale
register('en', () => import('./locales/en.json'));

export const initialize = async (): Promise<void> => {
	return init({
		fallbackLocale: defaultLocale,
		initialLocale: browser ? window.navigator.language || defaultLocale : defaultLocale
	});
};

export { _, locale, locales } from 'svelte-i18n';
