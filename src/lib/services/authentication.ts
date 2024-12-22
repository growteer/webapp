import { createAppKit } from '@reown/appkit';
import { sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public';

const networks = [sepolia];

const wagmiAdapter = new WagmiAdapter({
	projectId: PUBLIC_REOWN_PROJECT_ID,
	networks
});

const metadata = {
	name: 'growteer',
	description: 'growteer proof of concept',
	url: 'http://localhost:5173',
	icons: ['https://avatars.githubusercontent.com/u/179229932']
};

const appKitModal = createAppKit({
	adapters: [wagmiAdapter],
	metadata,
	networks: [sepolia],
	projectId: PUBLIC_REOWN_PROJECT_ID,
	features: {
		swaps: false,
		email: false,
		socials: ['google', 'github']
	}
});
appKitModal.setThemeMode('light');
appKitModal.setThemeVariables({
	'--w3m-accent': '#eb4f27',
	'--w3m-color-mix': '#eb4f27'
});

export { appKitModal, networks, wagmiAdapter };
