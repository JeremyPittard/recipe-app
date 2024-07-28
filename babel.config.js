const { plugins } = require("./postcss.config");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // make sure reanimated is listed last as per docs
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
  };
};
