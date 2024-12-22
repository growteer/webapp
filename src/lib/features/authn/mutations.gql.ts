import { gql } from '@apollo/client';

export const GENERATE_NONCE = gql`
	mutation GenerateNonce($address: String!) {
		generateNonce(input: { address: $address }) {
			value
		}
	}
`;
