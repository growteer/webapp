import { type Web3AuthOptions } from '@web3auth/modal';
import { WEB3AUTH_NETWORK } from '@web3auth/base';
import { PUBLIC_W3A_CLIENT_ID } from '$env/static/public';
import { getInjectedAdapters } from '@web3auth/default-evm-adapter';
import { chainConfig, privateKeyProvider, web3Auth } from './config';

const web3AuthOptions: Web3AuthOptions = {
	clientId: PUBLIC_W3A_CLIENT_ID,
	chainConfig,
	web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
	privateKeyProvider
};

export const initEVMAdapter = async () => {
	const adapters = await getInjectedAdapters({ options: web3AuthOptions });
	adapters.forEach((adapter) => web3Auth.configureAdapter(adapter));
};
