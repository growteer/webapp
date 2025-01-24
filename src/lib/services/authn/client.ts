import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
import { SolanaClient } from '../solana/client';
import { web3Auth } from '../w3a/web3auth';
import { generateNonce, login } from './mutations.gql';

export class AuthClient {
	async login(): Promise<boolean> {
		if (!web3Auth) throw new Error('cannot create AuthClient without web3auth being initialized');

		// Open the Web3Auth Modal
		const provider = await web3Auth.connect();
		if (!provider) throw new Error('login failed');

		try {
			// Get the wallet address
			const client = new SolanaClient(provider);
			const address = await client.getAddress();

			// Sign a message for verification
			const nonce = await generateNonce(address);
			const { message, signature } = await client.signLogin(nonce);

			// Verify signature through the backend and set tokens in local storage
			const loggedIn = await login(address, message, signature);

			return loggedIn;
		} catch (err) {
			await web3Auth.logout();
			throw err;
		}
	}

	async logout() {
		removeSessionToken();
		removeRefreshToken();
		await web3Auth.logout();
	}
}
