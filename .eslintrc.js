module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard',
  ],
  plugins: [

  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'semi': 0,
    'space-before-function-paren': 0,
    // http://eslint.cn/docs/rules/no-trailing-spaces
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    // 要求或禁止尾随逗号, 关闭此规则 , vue 需要【方法】需要在尾部添加逗号，主要是方便阅读代码
    'comma-dangle': 0,
    // 此规则在非空文件的末尾强制执行至少一个换行符, 关闭此规则
    'eol-last': 0,
  }
};