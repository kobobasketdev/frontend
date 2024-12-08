import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	verbose: true,
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				isolatedModules: true,
				diagnostics: {
					ignoreCodes: [1343]
				},
				astTransformers: {
					before: [
						{
							path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
							options: { 
								metaObjectReplacement: { 
									env: {
										VITE_PROTOCOL: 'https://',
										VITE_API_ENDPOINT: 'test.com',
									}
								} 
							}
						}
					]
				}
			}
		]
	},
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png|css)$': '<rootDir>/fileTransformer.ts',
		'@src/(.*)': '<rootDir>/src/$1'
	},
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	coveragePathIgnorePatterns: ['fileTransformer.ts', 'node_modules'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		}
	}
};

export default config;