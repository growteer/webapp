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
	url: 'http://localhost',
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

export { appKitModal, networks };

/*
const loginWithGoogle = async () => {
	await initAuth();

	if (!web3Auth) throw new Error('web3Auth not initialized');

	const provider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
		loginProvider: LOGIN_PROVIDER.GOOGLE
	});

	if (!provider) throw new Error('provider not found');

	const walletClient = createWalletClient({
		chain: sepolia,
		transport: custom(provider)
	});

	const addresses = await walletClient.getAddresses();

	//TODO: remove
	console.log(`Addresses:${addresses}`);

	return provider;
};
*/
