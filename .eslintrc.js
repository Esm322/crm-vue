module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'jsx-ally/label-has-associated-control' : 'off',
    'vuejs-accessibility/label-has-for' : 'off',
    'no-return-assign': 'off',
    'arrow-body-style': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'vue/no-setup-props-destructure': 'off',
  },
};
