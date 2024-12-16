import { AuthAdapter, LOGIN_PROVIDER, MFA_LEVELS } from '@web3auth/auth-adapter';
import { UX_MODE, WALLET_ADAPTERS } from '@web3auth/base';
import { createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
import { privateKeyProvider, uiConfig, web3Auth } from './config';

const authAdapter = new AuthAdapter({
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

web3Auth.configureAdapter(authAdapter);

const loginWithGoogle = async () => {
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

export { loginWithGoogle };
