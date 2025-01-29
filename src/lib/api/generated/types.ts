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

export type Error = {
	__typename?: 'Error';
	extensions?: Maybe<ErrorExtensions>;
};

export type ErrorExtensions = {
	__typename?: 'ErrorExtensions';
	code: Scalars['String']['output'];
	type: ErrorType;
};

export enum ErrorType {
	BadRequest = 'BAD_REQUEST',
	InternalServerError = 'INTERNAL_SERVER_ERROR',
	Unauthenticated = 'UNAUTHENTICATED'
}

export type Location = {
	__typename?: 'Location';
	city?: Maybe<Scalars['String']['output']>;
	country: Scalars['String']['output'];
	postalCode?: Maybe<Scalars['String']['output']>;
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
	signup: UserProfile;
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
	userProfile: UserProfile;
};

export type QueryUserProfileArgs = {
	userDID: Scalars['String']['input'];
};

export type RefreshInput = {
	refreshToken: Scalars['String']['input'];
};

export type SignupInput = {
	city?: InputMaybe<Scalars['String']['input']>;
	country: Scalars['String']['input'];
	dateOfBirth: Scalars['String']['input'];
	firstname: Scalars['String']['input'];
	lastname: Scalars['String']['input'];
	postalCode?: InputMaybe<Scalars['String']['input']>;
	primaryEmail: Scalars['String']['input'];
	website?: InputMaybe<Scalars['String']['input']>;
};

export type UserProfile = {
	__typename?: 'UserProfile';
	about?: Maybe<Scalars['String']['output']>;
	dateOfBirth: Scalars['String']['output'];
	firstname: Scalars['String']['output'];
	lastname: Scalars['String']['output'];
	location: Location;
	personalGoal?: Maybe<Scalars['String']['output']>;
	primaryEmail: Scalars['String']['output'];
	website?: Maybe<Scalars['String']['output']>;
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

export type SignupMutationVariables = Exact<{
	profile: SignupInput;
}>;

export type SignupMutation = {
	__typename?: 'Mutation';
	signup: { __typename?: 'UserProfile'; firstname: string; lastname: string };
};
