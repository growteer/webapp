import { gql } from '@apollo/client';

export const GENERATE_NONCE = gql`
	mutation GenerateNonce($address: String!) {
		generateNonce(input: { address: $address }) {
			value
		}
	}
`;

export const LOGIN = gql`
	mutation Login($address: String!, $message: String!, $signature: String!) {
		login(input: { address: $address, message: $message, signature: $signature }) {
			sessionToken
		}
	}
`;
