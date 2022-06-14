module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-setup-props-destructure':  'off',
    '@typescript-eslint/ban-types':  'off',
    '@typescript-eslint/ban-ts-comment':  'off', // 使用@ts-ignore
    'expected':  'off' ,
    'no-prototype-builtins':  'off' ,
    'vue/no-mutating-props':  'off' ,
  }
}
