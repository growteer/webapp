import { AuthAdapter, LOGIN_PROVIDER, MFA_LEVELS } from '@web3auth/auth-adapter';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { CHAIN_NAMESPACES, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { PUBLIC_W3A_CLIENT_ID } from '$env/static/public';

let web3Auth: Web3AuthNoModal;

const init = async () => {
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

	web3Auth = new Web3AuthNoModal({
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

	web3Auth.configureAdapter(authAdapter);
	await web3Auth.init();

	return { loginWithGoogle };
};

const loginWithGoogle = async () => {
	const provider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
		loginProvider: LOGIN_PROVIDER.GOOGLE
	});

	const userInfo = await web3Auth.getUserInfo();
	console.log(`User email: ${userInfo.email ?? ''}`);

	return provider;
};

export { init };
