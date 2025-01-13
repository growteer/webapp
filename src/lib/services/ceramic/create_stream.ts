import { TileDocument, type TileMetadataArgs } from '@ceramicnetwork/stream-tile';
import type { CreateOpts } from '@ceramicnetwork/common';
import type { DID } from 'dids';
import { authenticate } from './client';

export const createStream = async <T extends Record<string, unknown>>(payload: T) => {
	const ceramic = await authenticate();
	if (!ceramic?.did) throw new Error('cannot create new stream without ceramic did authentication');

	const jws = await ceramic.did.createJWS(payload);
	const { opts, streamMetadata } = newMetadataAndOpts(ceramic.did);

	const document = await TileDocument.create(ceramic, jws, streamMetadata, opts);

	const decodedContent = await ceramic.did.verifyJWS(document.content);

	return { streamID: document.id, content: decodedContent.payload };
};

const newMetadataAndOpts = (did: DID) => {
	const opts: CreateOpts = {
		anchor: false,
		asDID: did,
		pin: true,
		publish: false
	};

	const streamMetadata: TileMetadataArgs = {
		controllers: [did.id],
		forbidControllerChange: true
	};

	return { opts, streamMetadata };
};
