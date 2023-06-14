export default {
	collectCoverageFrom: [
		'node_modules/@enonic-types/**/*.ts',
	],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: {
					sourceMap: true, // Needed to get correct Uncovered Line numbers
				}
			}
		]
	},
}
