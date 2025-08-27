import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('i18n service', () => {
	const originalWindow = global.window;
	let mockInit: ReturnType<typeof vi.fn>;
	let mockRegister: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.resetModules();
		mockInit = vi.fn().mockResolvedValue(undefined);
		mockRegister = vi.fn();

		vi.doMock('svelte-i18n', async () => {
			const actual = await vi.importActual('svelte-i18n');
			return {
				...actual,
				init: mockInit,
				register: mockRegister
			};
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.resetModules();
		global.window = originalWindow;
	});

	describe('initialize function', () => {
		it('should extract locale from browser language with region', async () => {
			Object.defineProperty(global, 'window', {
				value: {
					navigator: {
						language: 'de-DE'
					},
					setTimeout: originalWindow?.setTimeout,
					clearTimeout: originalWindow?.clearTimeout
				},
				writable: true,
				configurable: true
			});

			const { initialize } = await import('./index');
			await initialize();

			expect(mockInit).toHaveBeenCalledWith({
				fallbackLocale: 'en',
				initialLocale: 'de'
			});
		});

		it('should use browser language without region code', async () => {
			Object.defineProperty(global, 'window', {
				value: {
					navigator: {
						language: 'fr'
					},
					setTimeout: originalWindow?.setTimeout,
					clearTimeout: originalWindow?.clearTimeout
				},
				configurable: true,
				writable: true
			});

			const { initialize } = await import('./index');
			await initialize();

			expect(mockInit).toHaveBeenCalledWith({
				fallbackLocale: 'en',
				initialLocale: 'fr'
			});
		});

		it('should fallback to english locale when navigator is not available', async () => {
			Object.defineProperty(global, 'window', {
				value: {
					navigator: undefined,
					setTimeout: originalWindow.setTimeout,
					clearTimeout: originalWindow.clearTimeout
				},
				configurable: true,
				writable: true
			});

			const { initialize } = await import('./index');
			await initialize();

			expect(mockInit).toHaveBeenCalledWith({
				fallbackLocale: 'en',
				initialLocale: 'en'
			});
		});

		it('should fallback to english locale when window is not available', async () => {
			// @ts-expect-error - Intentionally removing window for test
			delete global.window;

			const { initialize } = await import('./index');
			await initialize();

			expect(mockInit).toHaveBeenCalledWith({
				fallbackLocale: 'en',
				initialLocale: 'en'
			});
		});
	});

	describe('browser locale parsing', () => {
		const testCases = [
			{ input: 'en-US', expected: 'en' },
			{ input: 'zh-Hans-CN', expected: 'zh' },
			{ input: 'es', expected: 'es' },
			{ input: null, expected: 'en' },
			{ input: undefined, expected: 'en' },
			{ input: '', expected: 'en' }
		];

		testCases.forEach(({ input, expected }) => {
			it(`should parse "${input}" to "${expected}"`, async () => {
				Object.defineProperty(global, 'window', {
					value: {
						navigator: {
							language: input
						},
						setTimeout: originalWindow.setTimeout,
						clearTimeout: originalWindow.clearTimeout
					},
					configurable: true,
					writable: true
				});

				const { initialize } = await import('./index');
				await initialize();

				expect(mockInit).toHaveBeenCalledWith({
					fallbackLocale: 'en',
					initialLocale: expected
				});
			});
		});
	});
});
