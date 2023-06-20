module.exports = {
  extends: [
    'stylelint-config-tailwindcss',
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-rational-order',
    'stylelint-config-html',
    'stylelint-config-html/vue'
  ],
  rules: {
    'color-hex-case': 'lower',
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['v-bind', 'constant']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'mixin', 'include', 'each', 'for', 'if']
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
    'selector-class-pattern': '^[a-z][a-z0-9-]*(?:(?:--|__)[a-z][a-z0-9-]*)?$',
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['px', 'rpx']
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'view', 'text']
      }
    ],
    'alpha-value-notation': 'number'
  },
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    'src/App.vue'
  ]
}
