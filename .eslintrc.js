module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'standard',
    './.eslintrc-auto-import.json',
    './.eslintrc-uni.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 8
      },
      multiline: {
        max: 1
      }
    }],
    'vue/no-dupe-keys': 'off',
    'vue/singleline-html-element-content-newline': ['error', {
      ignores: ['pre', 'textarea', 'text']
    }]
  }
}
