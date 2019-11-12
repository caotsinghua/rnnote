module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ],
  endOfLine: 'auto'
}
