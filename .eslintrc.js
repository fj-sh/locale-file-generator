
module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://typescript.nuxtjs.org/ja/guide/lint/
    '@nuxtjs/eslint-config-typescript',
    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention-for-vue-js-2-x
    'plugin:vue/essential',
    // https://github.com/nuxt/eslint-plugin-nuxt#recommended-rules
    'plugin:nuxt/recommended',
    // https://standardjs.com/readme-ja.html
    'standard'
  ],
  plugins: [
    'vue',
    // https://github.com/typescript-eslint/typescript-eslint
    '@typescript-eslint'

  ],
  rules: {

  },
  settings: {}
}
