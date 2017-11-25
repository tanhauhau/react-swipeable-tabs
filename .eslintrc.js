module.exports = {
  // So parent files don't get applied
  root: true,
  globals: {
    preval: false,
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: ['plugin:import/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'import', 'jsx-a11y', 'prettier', 'react'],
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'arrow-body-style': 'off', // Not our taste?
    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'function-paren-newline': 'off', // Incompatible with prettier
    indent: 'off', // Incompatible with prettier
    'space-before-function-paren': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'consistent-this': ['error', 'self'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
      },
    ],
    'no-console': 'error',
    'no-alert': 'error',
    'no-param-reassign': 'off', // Not our taste?
    'no-prototype-builtins': 'off', // airbnb use error
    'object-curly-spacing': 'off', // use babel plugin rule
    'no-restricted-properties': 'off', // To remove once react-docgen support ** operator.
    'prefer-destructuring': 'off', // To remove once react-docgen support ** operator.

    'babel/object-curly-spacing': ['error', 'always'],

    'import/unambiguous': 'off', // scripts
    'import/namespace': ['error', { allowComputed: true }],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    'react/jsx-indent': 'off', // Incompatible with prettier
    'react/jsx-closing-bracket-location': 'off', // Incompatible with prettier
    'react/jsx-wrap-multilines': 'off', // Incompatible with prettier
    'react/jsx-indent-props': 'off', // Incompatible with prettier
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/sort-prop-types': 'error',

    'prettier/prettier': ['error'],
  },
};
