const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const compiler =
  process.env.NODE_ENV !== 'development'
    ? {
        removeConsole: {
          exclude: ['error'],
        },
      }
    : {
        removeConsole: false,
      }
module.exports = withBundleAnalyzer({
  compiler: compiler,
  swcMinify: true,
  reactStrictMode: false,
  webpack(config, options) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    )
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
      options: { svgoConfig: { plugins: [{ removeViewBox: false }] } },
    })
    return config
  },
})
