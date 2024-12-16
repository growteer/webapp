import { PUBLIC_W3A_CLIENT_ID } from '$env/static/public';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth } from '@web3auth/modal';

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

const web3Auth = new Web3Auth({
	clientId: PUBLIC_W3A_CLIENT_ID,
	chainConfig,
	storageKey: 'local',
	uiConfig,
	privateKeyProvider,
	web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
});

export { web3Auth, privateKeyProvider, uiConfig, chainConfig };
