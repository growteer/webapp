import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://gt.localhost/query',
	documents: ['src/lib/**/*.gql.ts'],
	generates: {
		'./src/lib/api/generated/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql'
			},
			config: {
				useTypeImports: true
			}
		},
		'./src/lib/api/generated/types.ts': {
			plugins: ['typescript', 'typescript-operations'],
			config: {
				useTypeImports: true
			}
		}
	},
	ignoreNoDocuments: true
};

export default config;
