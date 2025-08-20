import type { Provider } from '@reown/appkit-adapter-solana';
import { appkit } from '../wallet/appkit';

export class SolanaClient {
	private provider: Provider;

	constructor(provider: Provider) {
		this.provider = provider;
	}

	async getDIDPKH() {
		const address = await this.getAddress();
		return `did:pkh:solana:${address}`;
	}

	async getAddress() {
		const address = appkit.getAddress();
		if (!address) {
			throw new Error('no address found');
		}

		return address;
	}

	private newLoginMessage(nonce: string) {
		return Buffer.from(`Sign to log in to growteer.\nNonce: ${nonce}`);
	}

	async signLogin(nonce: string) {
		const message = this.newLoginMessage(nonce);

		const signature = await this.provider.signMessage(message);

		const serializedSignature = Buffer.from(signature).toString('base64');
		const serializedMessage = message.toString();

		return { message: serializedMessage, signature: serializedSignature };
	}

	async signMessage(data: Uint8Array): Promise<{ signature: Uint8Array }> {
		const signature = await this.provider.signMessage(data);
		return { signature };
	}
}
