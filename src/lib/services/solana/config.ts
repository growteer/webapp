import { PUBLIC_SOLANA_NETWORK } from '$env/static/public';

interface ChainParams {
	chainId: '0x1' | '0x2' | '0x3';
	displayName: string;
	name: 'mainnet' | 'testnet' | 'devnet';
	rpcTarget: string;
}

const mainnetParams: ChainParams = {
	chainId: '0x1',
	displayName: 'Solana Mainnet',
	name: 'mainnet',
	rpcTarget: 'https://rpc.ankr.com/solana'
};

const testnetParams: ChainParams = {
	chainId: '0x2',
	displayName: 'Solana Testnet',
	name: 'testnet',
	rpcTarget: 'https://api.testnet.solana.com'
};

const devnetParams: ChainParams = {
	chainId: '0x3',
	displayName: 'Solana Devnet',
	name: 'devnet',
	rpcTarget: 'https://api.devnet.solana.com'
};

export function solanaChainParams(): ChainParams {
	switch (PUBLIC_SOLANA_NETWORK) {
		case 'mainnet':
			return mainnetParams;
		case 'testnet':
			return testnetParams;
		default:
			return devnetParams;
	}
}
