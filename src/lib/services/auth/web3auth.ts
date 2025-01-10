import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_W3A_CLIENT_ID } from '$env/static/public';
import { AuthAdapter, MFA_LEVELS } from '@web3auth/auth-adapter';
import { CHAIN_NAMESPACES, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from '@web3auth/base';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import { Web3Auth, type Web3AuthOptions } from '@web3auth/modal';

const chainConfig = {
	chainNamespace: CHAIN_NAMESPACES.SOLANA,
	chainId: '0x2', // Testnet
	rpcTarget: 'https://api.testnet.solana.com',
	displayName: 'Solana Testnet',
	blockExplorerUrl: 'https://explorer.solana.com',
	ticker: 'SOL',
	tickerName: 'Solana',
	logo: 'https://images.toruswallet.io/solana.svg'
};

const privateKeyProvider = new SolanaPrivateKeyProvider({
	config: { chainConfig }
});

const uiConfig = {
	appName: 'Growteer',
	appUrl: 'http://localhost',
	logoLight: 'https://web3auth.io/logo-light.png',
	logoDark: 'https://web3auth.io/logo-dark.png',
	useLogoLoader: true
};

const web3AuthOptions: Web3AuthOptions = {
	clientId: PUBLIC_W3A_CLIENT_ID,
	chainConfig,
	storageKey: 'local',
	uiConfig,
	privateKeyProvider,
	web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
};

const web3Auth = new Web3Auth(web3AuthOptions);

const socialAdapter = new AuthAdapter({
	adapterSettings: {
		uxMode: UX_MODE.POPUP,
		whiteLabel: uiConfig,
		loginConfig: {
			google: {
				verifier: 'google-growteer',
				typeOfLogin: 'google',
				clientId: PUBLIC_GOOGLE_CLIENT_ID
			}
		}
	},
	loginSettings: {
		mfaLevel: MFA_LEVELS.NONE
	},
	privateKeyProvider
});

let isInitialized = false;

export const initWeb3Auth = async () => {
	if (isInitialized) return web3Auth;

	web3Auth.configureAdapter(socialAdapter);

	await web3Auth.initModal({
		modalConfig: {
			[WALLET_ADAPTERS.AUTH]: {
				label: 'social',
				loginMethods: {
					email_passwordless: {
						name: 'email_passwordless',
						showOnModal: false
					},
					sms_passwordless: {
						name: 'sms_passwordless',
						showOnModal: false
					},
					apple: {
						name: 'apple',
						showOnModal: false
					},
					discord: {
						name: 'discord',
						showOnModal: false
					},
					facebook: {
						name: 'facebook',
						showOnModal: false
					},
					farcaster: {
						name: 'fcaster',
						showOnModal: false
					},
					github: {
						name: 'github',
						showOnModal: false
					},
					kakao: {
						name: 'kakao',
						showOnModal: false
					},
					line: {
						name: 'line',
						showOnModal: false
					},
					linkedin: {
						name: 'linkedin',
						showOnModal: false
					},
					reddit: {
						name: 'reddit',
						showOnModal: false
					},
					twitch: {
						name: 'twitch',
						showOnModal: false
					},
					twitter: {
						name: 'twitter',
						showOnModal: false
					},
					wechat: {
						name: 'wechat',
						showOnModal: false
					},
					weibo: {
						name: 'weibo',
						showOnModal: false
					}
				}
			}
		}
	});

	isInitialized = true;

	return web3Auth;
};

export { web3Auth };
