import type { IProvider } from '@web3auth/base';
import { Web3 } from 'web3';

export class EtherClient {
	private web3: Web3;

	constructor(provider: IProvider) {
		this.web3 = new Web3(provider);
	}

	async getFirstAccount() {
		const accounts = await this.web3.eth.getAccounts();
		if (accounts.length === 0) {
			throw new Error('no accounts found');
		}

		return accounts[0];
	}

	newLoginMessage(nonce: string) {
		return `Sign to log in to growteer.\nNonce: ${nonce}`;
	}

	async signLogin(address: string, message: string) {
		return this.signMessage(message, address);
	}

	private async signMessage(message: string, address: string) {
		// returns a hex string representation of the 65-byte signature + "0x" prefix, making it 132 bytes long
		const rawHex = await this.web3.eth.personal.sign(message, address, '');
		const hexWithoutPrefix = rawHex.slice(2);

		// convert the hex string to a byte array (length == 65)
		const signatureBytes = Uint8Array.from(Buffer.from(hexWithoutPrefix, 'hex'));

		return signatureBytes;
	}
}
