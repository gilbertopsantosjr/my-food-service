module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: '.',
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['eslint:recommended', 'airbnb-base', 'airbnb-typescript/base'],
  ignorePatterns: ['*.d.ts'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'off',
    'no-redeclare': 'off',
    'import/export': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'generator-star-spacing': 'off',
    'comma-dangle': 'off',
    semi: ['error', 'never'],
    indent: 'off',
    'yield-star-spacing': ['off', 'after'],
    'prettier/prettier': ['error']
  }
}
