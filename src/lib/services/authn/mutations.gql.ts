import { gql } from '@apollo/client';
import { mutate } from '$lib/api/client/client';
import { ErrCode } from '$lib/api/client/error_codes';
import type {
	GenerateNonceMutation,
	GenerateNonceMutationVariables,
	LoginMutation,
	LoginMutationVariables,
	NewProfile,
	OnboardMutation,
	OnboardMutationVariables
} from '$lib/api/generated/types';
import { setRefreshToken, setSessionToken } from '$lib/storage/local';

const GENERATE_NONCE = gql`
	mutation GenerateNonce($address: String!) {
		generateNonce(address: $address) {
			nonce
		}
	}
`;

const LOGIN = gql`
	mutation Login($address: String!, $message: String!, $signature: String!) {
		login(input: { address: $address, message: $message, signature: $signature }) {
			state {
				isOnboarded
			}
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

	if (!errors?.length) {
		setSessionToken(data.login.sessionToken);
		setRefreshToken(data.login.refreshToken);

		return data.login.state.isOnboarded;
	}

	if (errors?.[0]?.extensions?.code === ErrCode.InvalidCredentials) {
		throw errors[0];
	}

	throw new Error('Something went wrong!', { cause: errors });
};

const ONBOARD = gql`
	mutation Onboard($profile: NewProfile!) {
		onboard(profile: $profile) {
			firstName
			lastName
		}
	}
`;

export const onboard = async (profile: NewProfile) => {
	const { data, errors } = await mutate<OnboardMutation, OnboardMutationVariables>({
		mutation: ONBOARD,
		variables: { profile }
	});

	if (!data) {
		throw new Error(errors?.[0]?.extensions?.code ?? ErrCode.InternalError);
	}

	const { firstName, lastName } = data.onboard;

	return { firstName, lastName };
};
