export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type AuthResult = {
	__typename?: 'AuthResult';
	refreshToken: Scalars['String']['output'];
	sessionToken: Scalars['String']['output'];
};

export type LocationInput = {
	city?: InputMaybe<Scalars['String']['input']>;
	country: Scalars['String']['input'];
	postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
	address: Scalars['String']['input'];
	message: Scalars['String']['input'];
	signature: Scalars['String']['input'];
};

export type Mutation = {
	__typename?: 'Mutation';
	generateNonce: NonceResult;
	login: AuthResult;
	refresh: AuthResult;
	signup: AuthResult;
};

export type MutationGenerateNonceArgs = {
	input: NonceInput;
};

export type MutationLoginArgs = {
	input: LoginInput;
};

export type MutationRefreshArgs = {
	input?: InputMaybe<RefreshInput>;
};

export type MutationSignupArgs = {
	input: SignupInput;
};

export type NonceInput = {
	address: Scalars['String']['input'];
};

export type NonceResult = {
	__typename?: 'NonceResult';
	nonce: Scalars['String']['output'];
};

export type Query = {
	__typename?: 'Query';
	nonce: NonceResult;
	nonces?: Maybe<Array<Maybe<NonceResult>>>;
};

export type QueryNonceArgs = {
	address: Scalars['String']['input'];
};

export type RefreshInput = {
	refreshToken: Scalars['String']['input'];
};

export type SignupInput = {
	login: LoginInput;
	profile: UserProfileInput;
};

export type UserProfileInput = {
	about?: InputMaybe<Scalars['String']['input']>;
	dateOfBirth: Scalars['String']['input'];
	firstname: Scalars['String']['input'];
	lastname: Scalars['String']['input'];
	location?: InputMaybe<LocationInput>;
	personalGoal?: InputMaybe<Scalars['String']['input']>;
	primaryEmail: Scalars['String']['input'];
	website?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshMutationVariables = Exact<{
	refreshToken: Scalars['String']['input'];
}>;

export type RefreshMutation = {
	__typename?: 'Mutation';
	refresh: { __typename?: 'AuthResult'; sessionToken: string; refreshToken: string };
};

export type GenerateNonceMutationVariables = Exact<{
	address: Scalars['String']['input'];
}>;

export type GenerateNonceMutation = {
	__typename?: 'Mutation';
	generateNonce: { __typename?: 'NonceResult'; nonce: string };
};

export type LoginMutationVariables = Exact<{
	address: Scalars['String']['input'];
	message: Scalars['String']['input'];
	signature: Scalars['String']['input'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: { __typename?: 'AuthResult'; sessionToken: string; refreshToken: string };
};
