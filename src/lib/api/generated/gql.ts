/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
	'\n\tmutation Refresh($refreshToken: String!) {\n\t\trefreshSession(input: { refreshToken: $refreshToken }) {\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n':
		types.RefreshDocument,
	'\n\tmutation UpdateUserProfile($profile: UpdatedProfile!) {\n\t\tupdateProfile(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tdateOfBirth\n\t\t\tprimaryEmail\n\t\t\tlocation {\n\t\t\t\tcountry\n\t\t\t\tpostalCode\n\t\t\t\tcity\n\t\t\t}\n\t\t\twebsite\n\t\t\tpersonalGoal\n\t\t\tabout\n\t\t}\n\t}\n':
		types.UpdateUserProfileDocument,
	'\n\tmutation GenerateNonce($address: String!) {\n\t\tgenerateNonce(address: $address) {\n\t\t\tnonce\n\t\t}\n\t}\n':
		types.GenerateNonceDocument,
	'\n\tmutation Login($address: String!, $message: String!, $signature: String!) {\n\t\tlogin(input: { address: $address, message: $message, signature: $signature }) {\n\t\t\tstate {\n\t\t\t\tisOnboarded\n\t\t\t}\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n':
		types.LoginDocument,
	'\n\tmutation Onboard($profile: NewProfile!) {\n\t\tonboard(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n':
		types.OnboardDocument
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Refresh($refreshToken: String!) {\n\t\trefreshSession(input: { refreshToken: $refreshToken }) {\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Refresh($refreshToken: String!) {\n\t\trefreshSession(input: { refreshToken: $refreshToken }) {\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation UpdateUserProfile($profile: UpdatedProfile!) {\n\t\tupdateProfile(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tdateOfBirth\n\t\t\tprimaryEmail\n\t\t\tlocation {\n\t\t\t\tcountry\n\t\t\t\tpostalCode\n\t\t\t\tcity\n\t\t\t}\n\t\t\twebsite\n\t\t\tpersonalGoal\n\t\t\tabout\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateUserProfile($profile: UpdatedProfile!) {\n\t\tupdateProfile(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tdateOfBirth\n\t\t\tprimaryEmail\n\t\t\tlocation {\n\t\t\t\tcountry\n\t\t\t\tpostalCode\n\t\t\t\tcity\n\t\t\t}\n\t\t\twebsite\n\t\t\tpersonalGoal\n\t\t\tabout\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation GenerateNonce($address: String!) {\n\t\tgenerateNonce(address: $address) {\n\t\t\tnonce\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation GenerateNonce($address: String!) {\n\t\tgenerateNonce(address: $address) {\n\t\t\tnonce\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Login($address: String!, $message: String!, $signature: String!) {\n\t\tlogin(input: { address: $address, message: $message, signature: $signature }) {\n\t\t\tstate {\n\t\t\t\tisOnboarded\n\t\t\t}\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Login($address: String!, $message: String!, $signature: String!) {\n\t\tlogin(input: { address: $address, message: $message, signature: $signature }) {\n\t\t\tstate {\n\t\t\t\tisOnboarded\n\t\t\t}\n\t\t\tsessionToken\n\t\t\trefreshToken\n\t\t}\n\t}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Onboard($profile: NewProfile!) {\n\t\tonboard(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Onboard($profile: NewProfile!) {\n\t\tonboard(profile: $profile) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n'];

export function gql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
