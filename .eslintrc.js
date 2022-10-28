module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'import', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'warn',
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
