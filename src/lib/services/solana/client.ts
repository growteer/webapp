import { getAccountIdByNetwork, SolanaWebAuth } from '@didtools/pkh-solana';
import type { IProvider } from '@web3auth/base';
import { SolanaWallet } from '@web3auth/solana-provider';
import { solanaChainParams } from './config';
import { initWeb3Auth } from '../auth/web3auth';
import { DIDSession } from 'did-session';

export class SolanaClient {
	private wallet: SolanaWallet;

	constructor(provider: IProvider) {
		this.wallet = new SolanaWallet(provider);
	}

	async getDIDSessionPKH(resources: string[] = ['ceramic://*']) {
		const address = await this.getAddress();
		const accountID = getAccountIdByNetwork(solanaChainParams().name, address);

		const authMethod = await SolanaWebAuth.getAuthMethod(this, accountID);

		const session = await DIDSession.get(accountID, authMethod, { resources });

		return session;
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
