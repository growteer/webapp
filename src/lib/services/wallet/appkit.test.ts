import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockSolanaAdapter = vi.fn();

vi.mock('@reown/appkit-adapter-solana', () => ({ SolanaAdapter: mockSolanaAdapter }));

const solanaDevnetID = 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1';

describe('appkit service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.resetModules();
	});

	it('should create appkit with devnet configuration by default', async () => {
		vi.doMock('$env/static/public', () => ({
			PUBLIC_REOWN_PROJECT_ID: 'test-project-id',
			PUBLIC_SOLANA_NETWORK: ' '
		}));

		const { appkit } = await import('./appkit');

		expect(appkit).toBeDefined();
		expect(appkit.getActiveChainNamespace()).toBe('solana');
		expect(appkit.getChainId()).toBe(solanaDevnetID);
		expect(appkit.options.networks).toEqual([
			expect.objectContaining({
				id: solanaDevnetID,
				name: 'Solana Devnet'
			})
		]);
		expect(appkit.options.defaultNetwork).toEqual(
			expect.objectContaining({
				id: solanaDevnetID,
				name: 'Solana Devnet'
			})
		);
		expect(appkit.options.enableWalletConnect).toBe(false);
		expect(appkit.options.features?.allWallets).toBe(false);
		expect(appkit.options.features?.analytics).toBe(true);
		expect(appkit.options.enableAuthLogger).toBe(false);
		expect(appkit.options.enableWalletGuide).toBe(false);
		expect(appkit.options.enableWallets).toBe(false);
		expect(appkit.options.projectId).toBe('test-project-id');
	});
});
