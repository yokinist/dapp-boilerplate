/** @type {import('prettier').Options} */

const config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  importOrder: ['^[a-zA-Z](.*)$', '^@[a-zA-Z](.*)$$', '^[./]', '^@/[a-zA-Z](.*)$$'],
  importOrderSeparation: false,
};

module.exports = config;
