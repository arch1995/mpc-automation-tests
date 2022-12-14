const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: path.join(process.cwd(), "../../node_modules/crypto-browserify"),
    stream: path.join(process.cwd(), "../../node_modules/stream-browserify"),
    assert: path.join(process.cwd(), "../../node_modules/assert"),
    http: path.join(process.cwd(), "../../node_modules/stream-http"),
    https: path.join(process.cwd(), "../../node_modules/https-browserify"),
    os: path.join(process.cwd(), "../../node_modules/os-browserify"),
    url: path.join(process.cwd(), "../../node_modules/url"),
  });
  config.resolve.fallback = fallback;
  config.resolve.alias = {
    ...config.resolve.alias,
    "bn.js": require.resolve(path.join(__dirname, "../../node_modules/bn.js")),
    lodash: require.resolve(path.join(__dirname, "../../node_modules/lodash")),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: path.join(
        process.cwd(),
        "../../node_modules/process/browser.js"
      ),
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /genesisStates\/[a-z]*\.json$/,
      contextRegExp: /@ethereumjs\/common/,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
