import { mutate } from '$lib/api/client';
import type { GenerateNonceMutation, LoginInput, LoginMutation, NonceInput } from '$lib/api/generated/types';
import { gql } from '@apollo/client';

const GENERATE_NONCE = gql`
	mutation GenerateNonce($address: String!) {
		generateNonce(input: { address: $address }) {
			nonce
		}
	}
`;

const LOGIN = gql`
	mutation Login($address: String!, $message: String!, $signature: String!) {
		login(input: { address: $address, message: $message, signature: $signature }) {
			sessionToken
			refreshToken
		}
	}
`;

export const generateNonce = async (address: string) => {
	const { data, errors } = await mutate<GenerateNonceMutation, NonceInput>({
		mutation: GENERATE_NONCE,
		variables: { address }
	});

	if (errors?.length) throw new Error(errors[0].message);
	if (!data || !data.generateNonce?.nonce) throw new Error('could not generate a nonce');

	return data.generateNonce.nonce;
};

export const login = async (address: string, message: string, signature: string) => {
	const { data, errors } = await mutate<LoginMutation, LoginInput>({
		mutation: LOGIN,
		variables: { address, message, signature }
	});

	if (errors?.length) throw new Error(errors[0].message);
	if (!data || !data.login?.sessionToken) throw new Error('could not log in');

	return data.login;
};
