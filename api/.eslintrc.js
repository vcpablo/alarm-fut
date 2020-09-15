module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js']
      }
    }
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  plugins: ['jest', 'prettier', 'promise', 'fp', 'security'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:promise/recommended',
    'plugin:fp/recommended',
    'plugin:security/recommended'
  ],
  // ignorePatterns: ['/src/config/db/**/*.js'],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    'trailing-comma': [true, { multiline: 'always', singleline: 'never' }],
    'no-use-before-define': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true
      }
    ],
    'no-console': 'warn',
    'no-var': 'error',
    'fp/no-nil': 'off',
    'fp/no-let': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-throw': 'off',
    'fp/no-this': 'off',
    'fp/no-class': 'off',
    'fp/no-loops': 'off',
    'promise/always-return': 'warn',
    'fp/no-mutation': ['warn', { commonjs: true }]
  }
}
