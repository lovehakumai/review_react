const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // プロジェクトのルートディレクトリ
});

const customJestConfig = {
  rootDir: './', // Jest が参照するルートディレクトリ
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Jestのセットアップファイル
  testEnvironment: 'jest-environment-jsdom', // DOM環境でテストを実行
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Jest内でのみBabelを使用
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // "@/..." を src/ にマッピング
  },
};

module.exports = createJestConfig(customJestConfig);
