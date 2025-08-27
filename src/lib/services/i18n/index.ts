import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';
export const initialize = async (): Promise<void> => {
	register('en', () => import('./locales/en.json'));

	const browserLocale = typeof window !== 'undefined' ? window?.navigator?.language?.split('-')[0] : undefined;

	const initialLocale = browserLocale && browserLocale.length > 0 ? browserLocale : defaultLocale;

	return init({
		fallbackLocale: defaultLocale,
		initialLocale
	});
};

export { _, locale, locales } from 'svelte-i18n';
