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

export type LoginDetails = {
	address: Scalars['String']['input'];
	message: Scalars['String']['input'];
	signature: Scalars['String']['input'];
};

export type LoginResult = {
	__typename?: 'LoginResult';
	refreshToken: Scalars['String']['output'];
	sessionToken: Scalars['String']['output'];
	state: UserState;
};

export type Mutation = {
	__typename?: 'Mutation';
	_empty?: Maybe<Scalars['Boolean']['output']>;
	generateNonce: NonceResult;
	login: LoginResult;
	onboard: Profile;
	refreshSession: RefreshResult;
	updateProfile: Profile;
};

export type MutationGenerateNonceArgs = {
	address: Scalars['String']['input'];
};

export type MutationLoginArgs = {
	input: LoginDetails;
};

export type MutationOnboardArgs = {
	profile: NewProfile;
};

export type MutationRefreshSessionArgs = {
	input: RefreshInput;
};

export type MutationUpdateProfileArgs = {
	profile: UpdatedProfile;
};

export type NewProfile = {
	city?: InputMaybe<Scalars['String']['input']>;
	country: Scalars['String']['input'];
	dateOfBirth: Scalars['String']['input'];
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
	postalCode?: InputMaybe<Scalars['String']['input']>;
	primaryEmail: Scalars['String']['input'];
	website?: InputMaybe<Scalars['String']['input']>;
};

export type NonceResult = {
	__typename?: 'NonceResult';
	nonce: Scalars['String']['output'];
};

export type Profile = {
	__typename?: 'Profile';
	about?: Maybe<Scalars['String']['output']>;
	dateOfBirth: Scalars['String']['output'];
	firstName: Scalars['String']['output'];
	lastName: Scalars['String']['output'];
	location: Location;
	personalGoal?: Maybe<Scalars['String']['output']>;
	primaryEmail: Scalars['String']['output'];
	website?: Maybe<Scalars['String']['output']>;
};

export type Query = {
	__typename?: 'Query';
	_empty?: Maybe<Scalars['Boolean']['output']>;
	profile: Profile;
};

export type QueryProfileArgs = {
	userDID: Scalars['String']['input'];
};

export type RefreshInput = {
	refreshToken: Scalars['String']['input'];
};

export type RefreshResult = {
	__typename?: 'RefreshResult';
	refreshToken: Scalars['String']['output'];
	sessionToken: Scalars['String']['output'];
};

export type UpdatedProfile = {
	about?: InputMaybe<Scalars['String']['input']>;
	city?: InputMaybe<Scalars['String']['input']>;
	country: Scalars['String']['input'];
	dateOfBirth: Scalars['String']['input'];
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
	personalGoal?: InputMaybe<Scalars['String']['input']>;
	postalCode?: InputMaybe<Scalars['String']['input']>;
	primaryEmail: Scalars['String']['input'];
	website?: InputMaybe<Scalars['String']['input']>;
};

export type UserState = {
	__typename?: 'UserState';
	isOnboarded: Scalars['Boolean']['output'];
};

export type RefreshMutationVariables = Exact<{
	refreshToken: Scalars['String']['input'];
}>;

export type RefreshMutation = {
	__typename?: 'Mutation';
	refreshSession: { __typename?: 'RefreshResult'; sessionToken: string; refreshToken: string };
};

export type UpdateUserProfileMutationVariables = Exact<{
	profile: UpdatedProfile;
}>;

export type UpdateUserProfileMutation = {
	__typename?: 'Mutation';
	updateProfile: {
		__typename?: 'Profile';
		firstName: string;
		lastName: string;
		dateOfBirth: string;
		primaryEmail: string;
		website?: string | null;
		personalGoal?: string | null;
		about?: string | null;
		location: { __typename?: 'Location'; country: string; postalCode?: string | null; city?: string | null };
	};
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
	login: {
		__typename?: 'LoginResult';
		sessionToken: string;
		refreshToken: string;
		state: { __typename?: 'UserState'; isOnboarded: boolean };
	};
};

export type OnboardMutationVariables = Exact<{
	profile: NewProfile;
}>;

export type OnboardMutation = {
	__typename?: 'Mutation';
	onboard: { __typename?: 'Profile'; firstName: string; lastName: string };
};
