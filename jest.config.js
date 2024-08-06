/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    '^.+\\.tsx?$': 'ts-jest',
    // ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest-config/file-mock.js",
    // '.(css|less)$': '<rootDir>/jest-config/style-mock.js'
  },
  
  // transform: {
  //   <transform_regex>: ['ts-jest', { /* ts-jest config goes here in Jest */ }],
  //   },
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src",
  //   '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/__mocks__/fileMock.js',
  //   '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  // },
  // moduleNameMapper: {
    
  //     "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
  //     "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
  //     "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
      
  //   },
    // moduleNameMapper: {
    //   // '^@/(.*)$': '<rootDir>/src/$1',
    //   '@/(.*)$': '<rootDir>/src/$1',  
    //   '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    //   '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    //   '^@components/(.*)$': '<rootDir>/src/components/$1',
    //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    //   "\\.(scss|sass|css)$": "identity-obj-proxy",
    //   "\\@\\/(scss|sass|css)$": "identity-obj-proxy"
      
    // },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    "<rootDir>/**/*.test.(js|jsx|ts|tsx)",
    "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};