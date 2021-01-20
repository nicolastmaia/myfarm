module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb', '@react-native-community', 'prettier/recommended'], // TODO remove "/recommended" from prettier so airbnb rules start showing
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
  },
};
