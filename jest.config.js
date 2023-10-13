module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.scss$': 'jest-transform-scss',
  },
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/reportWebVitals.js',
    'src/setupTests.js',
    'src/tests/',
    '\\.jpg$',
    '\\.png$',
    '\\.svg$',
    '\\.scss$',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/assets/images',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|scss)$': '<rootDir>/src/utils/fileMock.js',
  },
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  }
}