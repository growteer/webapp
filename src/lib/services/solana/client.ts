import type { IProvider } from '@web3auth/base';
import { SolanaWallet } from '@web3auth/solana-provider';
import { initWeb3Auth } from '../w3a/web3auth';

export class SolanaClient {
	private wallet: SolanaWallet;

	constructor(provider: IProvider) {
		this.wallet = new SolanaWallet(provider);
	}

	async getDIDPKH() {
		const address = await this.getAddress();
		return `did:pkh:solana:${address}`;
	}

	async getAddress() {
		const accounts = await this.wallet.requestAccounts();
		if (accounts.length === 0) {
			throw new Error('no accounts found');
		}

		return accounts[0];
	}

	private newLoginMessage(nonce: string) {
		return Buffer.from(`Sign to log in to growteer.\nNonce: ${nonce}`);
	}

	async signLogin(nonce: string) {
		const message = this.newLoginMessage(nonce);

		const signature = await this.wallet.signMessage(message);

		const serializedSignature = Buffer.from(signature).toString('base64');
		const serializedMessage = message.toString();

		return { message: serializedMessage, signature: serializedSignature };
	}

	async signMessage(data: Uint8Array): Promise<{ signature: Uint8Array }> {
		const signature = await this.wallet.signMessage(data);
		return { signature };
	}
}

export const createSolanaClient = async () => {
	const w3a = await initWeb3Auth();
	const { provider } = w3a;
	if (!provider) throw new Error('could not get a provider from web3auth to create a solana client');

	return new SolanaClient(provider);
};
