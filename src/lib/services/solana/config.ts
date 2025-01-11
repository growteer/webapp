import { PUBLIC_SOLANA_NETWORK } from '$env/static/public';

interface ChainParams {
	chainId: string;
	rpcTarget: string;
	displayName: string;
}

const mainnetParams: ChainParams = {
	chainId: '0x1',
	rpcTarget: 'https://rpc.ankr.com/solana',
	displayName: 'Solana Mainnet'
};

const testnetParams: ChainParams = {
	chainId: '0x2',
	rpcTarget: 'https://api.testnet.solana.com',
	displayName: 'Solana Testnet'
};

const devnetParams: ChainParams = {
	chainId: '0x3',
	rpcTarget: 'https://api.devnet.solana.com',
	displayName: 'Solana Devnet'
};

export function solanaConfig(): ChainParams {
	switch (PUBLIC_SOLANA_NETWORK) {
		case 'mainnet':
			return mainnetParams;
		case 'testnet':
			return testnetParams;
		default:
			return devnetParams;
	}
}
