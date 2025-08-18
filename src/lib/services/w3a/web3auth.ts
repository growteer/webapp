import { PUBLIC_W3A_CLIENT_ID } from '$env/static/public';
import { Web3Auth, type Web3AuthOptions, WEB3AUTH_NETWORK, MFA_LEVELS, WALLET_CONNECTORS } from '@web3auth/modal';

const web3AuthOptions: Web3AuthOptions = {
	clientId: PUBLIC_W3A_CLIENT_ID,
	uiConfig: {
		logoLight: 'https://web3auth.io/logo-light.png',
		logoDark: 'https://web3auth.io/logo-dark.png'
	},
	mfaLevel: MFA_LEVELS.NONE,
	web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
	modalConfig: {
		hideWalletDiscovery: true,
		connectors: {
			[WALLET_CONNECTORS.METAMASK]: {
				label: 'metamask',
				showOnModal: false
			},
			[WALLET_CONNECTORS.AUTH]: {
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
					}
				}
			}
		}
	}
};

let web3Auth: Web3Auth | undefined;
let isInitialized = false;

const initWeb3Auth = async () => {
	if (web3Auth && isInitialized) return web3Auth;

	web3Auth = new Web3Auth(web3AuthOptions);

	await web3Auth.init();

	isInitialized = true;

	return web3Auth;
};

export { web3Auth, initWeb3Auth };
