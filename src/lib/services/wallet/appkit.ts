import { createAppKit } from '@reown/appkit';
import { SolanaAdapter, type Provider } from '@reown/appkit-adapter-solana';
import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public';
import { solanaChainParams } from '../solana/config';

const solanaWeb3JsAdapter = new SolanaAdapter();
const network = solanaChainParams().appkitConfig;

export const appkit = createAppKit({
	adapters: [solanaWeb3JsAdapter],
	networks: [network],
	defaultNetwork: network,
	projectId: PUBLIC_REOWN_PROJECT_ID,
	features: {
		analytics: true,
		allWallets: false
	},
	enableWalletConnect: false,
	enableWalletGuide: false,
	enableAuthLogger: false,
	enableWallets: false
});

export const getProvider = () => {
	return appkit.getProvider('solana') as Provider;
};
