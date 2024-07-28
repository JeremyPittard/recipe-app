module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src /**/*.{js,jsx,ts,tsx}",
      "!./src/helpers/**/*.{js,jsx,ts,tsx}",
    ],
  };
};
