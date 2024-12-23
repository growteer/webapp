export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type LoginInput = {
  address: Scalars['String']['input'];
  message: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateNonce: Nonce;
  login: Session;
};


export type MutationGenerateNonceArgs = {
  input: NonceInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Nonce = {
  __typename?: 'Nonce';
  value: Scalars['String']['output'];
};

export type NonceInput = {
  address: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  nonce?: Maybe<Nonce>;
  nonces?: Maybe<Array<Maybe<Nonce>>>;
};


export type QueryNonceArgs = {
  address: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  sessionToken: Scalars['String']['output'];
};

export type GenerateNonceMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GenerateNonceMutation = { __typename?: 'Mutation', generateNonce: { __typename?: 'Nonce', value: string } };

export type LoginMutationVariables = Exact<{
  address: Scalars['String']['input'];
  message: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Session', sessionToken: string } };
