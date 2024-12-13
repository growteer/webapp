import { AuthAdapter, LOGIN_PROVIDER, MFA_LEVELS } from '@web3auth/auth-adapter';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { CHAIN_NAMESPACES, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { PUBLIC_W3A_CLIENT_ID } from '$env/static/public';

let web3Auth: Web3AuthNoModal | undefined = undefined;

const initAuth = async () => {
	if (web3Auth) return;

	const chainConfig = {
		chainNamespace: CHAIN_NAMESPACES.EIP155,
		chainId: '0xaa36a7',
		rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
		displayName: 'Ethereum Sepolia Testnet',
		blockExplorerUrl: 'https://sepolia.etherscan.io',
		ticker: 'ETH',
		tickerName: 'Ethereum',
		logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
	};

	const privateKeyProvider = new EthereumPrivateKeyProvider({
		config: { chainConfig }
	});

	const uiConfig = {
		appName: 'Growteer',
		appUrl: 'http://localhost',
		logoLight: 'https://web3auth.io/logo-light.png',
		logoDark: 'https://web3auth.io/logo-dark.png',
		useLogoLoader: true
	};

	const tmpWeb3Auth = new Web3AuthNoModal({
		clientId: PUBLIC_W3A_CLIENT_ID,
		web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
		privateKeyProvider,
		uiConfig
	});

	const authAdapter = new AuthAdapter({
		adapterSettings: {
			uxMode: UX_MODE.POPUP,
			whiteLabel: uiConfig
		},
		loginSettings: {
			mfaLevel: MFA_LEVELS.NONE
		},
		privateKeyProvider
	});

	tmpWeb3Auth.configureAdapter(authAdapter);
	await tmpWeb3Auth.init();

	web3Auth = tmpWeb3Auth;
};

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

const getWeb3Auth = () => {
	if (web3Auth) return web3Auth;

	throw new Error('tried to get web3Auth before it was initialized');
};

export { initAuth, loginWithGoogle, getWeb3Auth };
