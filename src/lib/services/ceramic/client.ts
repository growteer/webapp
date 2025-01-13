import { CeramicClient } from '@ceramicnetwork/http-client';
import { createSolanaClient } from '$lib/services/solana/client';
import { PUBLIC_CERAMIC_API_URL } from '$env/static/public';

export const authenticate = async () => {
	const solClient = await createSolanaClient();
	const session = await solClient.getDIDSessionPKH();
	if (!session.did.authenticated) throw new Error('did is not authenticated, cannot authenticate with ceramic');

	const ceramic = new CeramicClient(PUBLIC_CERAMIC_API_URL);
	ceramic.did = session.did;

	return ceramic;
};
