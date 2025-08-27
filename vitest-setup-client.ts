import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server';
import { initialize } from '$lib/services/i18n';

beforeAll(async () => {
	server.listen();

	await initialize({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
