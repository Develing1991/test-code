module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    modulePathIgnorePatterns: ['./Temp.spec.tsx'], //, '__test__'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.cjs',
    },
}
