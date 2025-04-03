/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export const RefreshDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Refresh' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'refreshToken' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'refreshSession' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'refreshToken' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'refreshToken' } }
										}
									]
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const UpdateUserProfileDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateUserProfile' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatedProfile' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'updateProfile' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'profile' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dateOfBirth' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'primaryEmail' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'location' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'country' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'city' } }
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'website' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'personalGoal' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'about' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GenerateNonceDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'GenerateNonce' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'generateNonce' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'address' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'nonce' } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GenerateNonceMutation, GenerateNonceMutationVariables>;
export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Login' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'message' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'signature' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'address' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } }
										},
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'message' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'message' } }
										},
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'signature' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'signature' } }
										}
									]
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'state' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [{ kind: 'Field', name: { kind: 'Name', value: 'isOnboarded' } }]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const OnboardDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Onboard' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'NewProfile' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'onboard' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'profile' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastName' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<OnboardMutation, OnboardMutationVariables>;
