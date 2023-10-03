// config-overrides.js
// see: https://github.com/timarney/react-app-rewired

const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("react-app-rewire-babel-loader");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
  // white-list some npm modules to the babel-loader pipeline
  // see: https://webpack.js.org/configuration/module/#rule-include

  config = rewireBabelLoader.include(
    config,
    resolveApp("node_modules/isemail"),
    resolveApp("../login"),
    resolveApp("../dashboard"),
    resolveApp("../common"),
    resolveApp("../account"),
    resolveApp("../candidate"),
    resolveApp("../job"),
    resolveApp("../settings"),
    resolveApp("../formbuilder  ")
  );

  // black-list some modules from the babel-loader pipeline
  // see: https://webpack.js.org/configuration/module/#rule-exclude

  config = rewireBabelLoader.exclude(config, /(node_modules|bower_components)/);

  return config;
};
