import gql from 'graphql-tag';
import { client } from './client';
import type { GenerateNonceMutation, NonceParams } from './generated/types';

const GENERATE_NONCE = gql`
	mutation GenerateNonce($address: String!) {
		generateNonce(input: { address: $address }) {
			value
		}
	}
`;

const generateNonce = async (address: string) => {
	const res = await client.mutate<GenerateNonceMutation, NonceParams>({
		mutation: GENERATE_NONCE,
		variables: { address }
	});

	if (res.errors?.length) throw new Error(res.errors[0].message);
	if (!res.data?.generateNonce?.value) throw new Error('could not generate a nonce');

	return res.data.generateNonce.value;
};

export { generateNonce };
