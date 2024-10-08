module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../..',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.controller.{js,ts}',
    '**/*.service.{js,ts}',
    '**/*.pipe.{js,ts}',
    '**/*.guard.{js,ts}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/src/**/*.module.{js,ts}',
    '!**/src/**/*.dto.{js,ts}',
    '!**/src/**/*.entity.{js,ts}',
    '!**/src/**/*.config.{js,ts}',
    '!**/src/main.{js,ts}',
    '!**/src/**/index.{js,ts}',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
