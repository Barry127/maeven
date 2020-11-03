const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/
});
module.exports = withMDX({
  devIndicators: {
    autoPrerender: false
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  basePath: '/maeven',
  target: 'serverless' // test on gh-pages?!
});
