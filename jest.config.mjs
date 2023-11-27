import nextJest from 'next/jest.js'

//-configuration object must always be JSON-serializable.
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// 👇 Setup overlap for both the ssr & csr testing
/** @type {import('jest').Config} */
const sharedConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
};
//👇 Setup for testing client side rendered components
const clientTestConfig = {
  ...sharedConfig,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/*components.test.tsx','**/__tests__/page-*']
};
//👇 Setup for testing server side rendered components
const serverTestConfig = {
  ...sharedConfig,
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__tests__/*.server.test.tsx']
};

const config = {
  projects: [
    await createJestConfig(clientTestConfig)(),
    await createJestConfig(serverTestConfig)(),
  ],
};
 
//createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;