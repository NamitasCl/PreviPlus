module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/tests/**/*.test.js',
    ],
    collectCoverage: false,
    coverageDirectory: 'coverage',
};