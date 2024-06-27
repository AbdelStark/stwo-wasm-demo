module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const wasmExtensionRegExp = /\.wasm$/;
      webpackConfig.resolve.extensions.push(".wasm");
      webpackConfig.experiments = {
        asyncWebAssembly: true,
        syncWebAssembly: true,
      };
      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.type === "asset/resource") {
            oneOf.exclude.push(wasmExtensionRegExp);
          }
        });
      });
      return webpackConfig;
    },
  },
  eslint: {
    configure: (eslintConfig) => {
      eslintConfig.ignorePatterns = ["src/pkg/**/*"];
      return eslintConfig;
    },
  },
};
