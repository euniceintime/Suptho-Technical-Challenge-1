const removeImports = require('next-remove-imports')({});
module.exports = removeImports({
  cssModules: true,
  webpack: (config) => {
    // Load SVGs inline
    config.module.rules.push({
      test: /\.svg$/,
      use: { loader: 'svg-inline-loader', options: {} },
    });
    return config;
  },
});
