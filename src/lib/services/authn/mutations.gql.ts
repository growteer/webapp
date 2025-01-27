import { gql } from '@apollo/client';
import { mutate } from '$lib/api/client';
import { ErrCode } from '$lib/api/error_codes';
import type {
	GenerateNonceMutation,
	GenerateNonceMutationVariables,
	LoginMutation,
	LoginMutationVariables,
	SignupInput,
	SignupMutation,
	SignupMutationVariables
} from '$lib/api/generated/types';
import { setRefreshToken, setSessionToken } from '$lib/storage/local';

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
	const { data } = await mutate<GenerateNonceMutation, GenerateNonceMutationVariables>({
		mutation: GENERATE_NONCE,
		variables: { address }
	});

	if (!data || !data.generateNonce?.nonce) throw new Error('could not generate a nonce');

	return data.generateNonce.nonce;
};

export const login = async (address: string, message: string, signature: string): Promise<boolean> => {
	const { data, errors } = await mutate<LoginMutation, LoginMutationVariables>({
		mutation: LOGIN,
		variables: { address, message, signature }
	});

	if (data?.login?.sessionToken) {
		setSessionToken(data.login.sessionToken);
		setRefreshToken(data.login.refreshToken);

		if (!errors?.[0]) return true;
	}

	if (errors?.[0].extensions?.code == ErrCode.UserNotSignedUp) {
		return false;
	}

	if (errors?.[0]?.extensions?.code === ErrCode.InvalidCredentials) {
		throw errors[0];
	}

	throw new Error('Something went wrong!', { cause: errors });
};

const SIGNUP = gql`
	mutation Signup($profile: SignupInput!) {
		signup(input: $profile) {
			firstname
			lastname
		}
	}
`;

export const signup = async (profile: SignupInput) => {
	const { data, errors } = await mutate<SignupMutation, SignupMutationVariables>({
		mutation: SIGNUP,
		variables: { profile }
	});

	if (!data) {
		throw new Error(errors?.[0]?.extensions?.code ?? ErrCode.InternalError);
	}

	const { firstname, lastname } = data.signup;

	return { firstname, lastname };
};
