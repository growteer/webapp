import { gql } from '@apollo/client';
import { mutate } from '$lib/api/client';
import { ErrCode } from '$lib/api/error_codes';
import type { LoginInput, SignupInput, SignupMutation, UserProfileInput } from '$lib/api/generated/types';
import { setRefreshToken, setSessionToken } from '$lib/storage/local';

const SIGNUP = gql`
	mutation Signup($input: SignupInput!) {
		signup(input: $input) {
			sessionToken
			refreshToken
		}
	}
`;

export const signup = async (login: LoginInput, profile: UserProfileInput) => {
	const { data, errors } = await mutate<SignupMutation, SignupInput>({
		mutation: SIGNUP,
		variables: { login, profile }
	});

	if (data?.signup?.sessionToken) {
		setSessionToken(data.signup.sessionToken);
		setRefreshToken(data.signup.refreshToken);

		return;
	}

	if (errors?.[0]?.extensions?.code === ErrCode.InvalidCredentials) {
		throw errors[0];
	}

	throw new Error('Something went wrong!', { cause: errors });
};
