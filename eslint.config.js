// eslint.config.mjs o eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "import/no-named-as-default": "off",
    },
  },
]);
