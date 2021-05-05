const path = require('path')

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    keySeparator: '.',
    localePath: path.resolve('./src/locales')
  }
}