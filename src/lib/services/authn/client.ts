import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
import { SolanaClient } from '../wallet/solana/client';
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
			const unsubscribeEvents = appkit.subscribeEvents(async (state) => {
				if (state.data.event === 'CONNECT_SUCCESS') {
					console.log('connection success');
				}
				if (state.data.event !== 'MODAL_CLOSE') return;

				unsubscribeEvents();

				// We have to use this retry for now, as the MODAL_CLOSE event is fired before the provider is
				// ready, thus appkit.subscribeProviders also doesn't work in conjunction with MODAL_CLOSE. This
				// seems the only option to reliably handle both the happy path and the user closing the modal.
				const provider = await this.getProviderWithRetry(5, 10);
				if (provider) return resolve(provider);

				reject(new Error('Login modal closed before connecting'));
			});

			appkit.open({ view: 'Connect' });
		});
	}

	async getProviderWithRetry(attempts: number, delay: number): Promise<Provider | undefined> {
		for (let i = 0; i < attempts; i++) {
			const provider = appkit.getProvider<Provider>('solana');
			if (provider) return provider;

			if (i < attempts - 1) {
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		return;
	}
}
