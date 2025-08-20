import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
import { SolanaClient } from '../solana/client';
import { appkit } from '$lib/services/wallet/appkit';
import { generateNonce, login } from './mutations.gql';
import type { Provider } from '@reown/appkit-adapter-solana';

export class AuthClient {
	async login(): Promise<boolean> {
		try {
			// Open the Modal
			const provider = await this.loginModal();

			const solana = new SolanaClient(provider);
			const address = await solana.getAddress();

			// Sign a message for verification
			const nonce = await generateNonce(address);
			const { message, signature } = await solana.signLogin(nonce);

			// Verify signature through the backend and set tokens in local storage
			const loggedIn = await login(address, message, signature);

			return loggedIn;
		} catch (err) {
			await appkit.disconnect();
			throw err;
		}
	}

	async logout() {
		removeSessionToken();
		removeRefreshToken();
		await appkit.disconnect('solana');
	}

	async loginModal(): Promise<Provider> {
		return new Promise((resolve, reject) => {
			appkit.subscribeProviders((state) => {
				if (!state.solana) return reject(new Error('Solana provider not available'));

				return resolve(state.solana as Provider);
			});

			appkit.open({ view: 'Connect' });
		});
	}
}
