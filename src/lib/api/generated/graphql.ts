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
	updateProfile: UserProfile;
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

export type MutationUpdateProfileArgs = {
	input: ProfileUpdate;
};

export type NonceInput = {
	address: Scalars['String']['input'];
};

export type NonceResult = {
	__typename?: 'NonceResult';
	nonce: Scalars['String']['output'];
};

export type ProfileUpdate = {
	about?: InputMaybe<Scalars['String']['input']>;
	city?: InputMaybe<Scalars['String']['input']>;
	country: Scalars['String']['input'];
	dateOfBirth: Scalars['String']['input'];
	firstname: Scalars['String']['input'];
	lastname: Scalars['String']['input'];
	personalGoal?: InputMaybe<Scalars['String']['input']>;
	postalCode?: InputMaybe<Scalars['String']['input']>;
	primaryEmail: Scalars['String']['input'];
	website?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateUserProfileMutationVariables = Exact<{
	input: ProfileUpdate;
}>;

export type UpdateUserProfileMutation = {
	__typename?: 'Mutation';
	updateProfile: {
		__typename?: 'UserProfile';
		firstname: string;
		lastname: string;
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
	login: { __typename?: 'AuthResult'; sessionToken: string; refreshToken: string };
};

export type SignupMutationVariables = Exact<{
	profile: SignupInput;
}>;

export type SignupMutation = {
	__typename?: 'Mutation';
	signup: { __typename?: 'UserProfile'; firstname: string; lastname: string };
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
						name: { kind: 'Name', value: 'refresh' },
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProfileUpdate' } } }
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
								name: { kind: 'Name', value: 'input' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'firstname' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastname' } },
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
								name: { kind: 'Name', value: 'input' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'address' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } }
										}
									]
								}
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
export const SignupDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Signup' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignupInput' } } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'signup' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'input' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'profile' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'firstname' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lastname' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
