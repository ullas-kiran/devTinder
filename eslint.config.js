const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = [
  // ============================================================
  // JavaScript source files
  // ============================================================
  {
    files: ["**/*.js"],

    ignores: [
      "node_modules/**",
      "coverage/**",
      "dist/**",
      "build/**",
      ".env",
      ".env.*",
    ],

    // ==========================================================
    // Language configuration
    // ==========================================================
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
      },
    },

    // ==========================================================
    // Plugins
    // ==========================================================
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    // ==========================================================
    // Rules
    // ==========================================================
    rules: {
      // --------------------------------------------------------
      // Import / require order
      // --------------------------------------------------------
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // --------------------------------------------------------
      // Possible bugs
      // --------------------------------------------------------
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-undef": "error",
      "no-unreachable": "error",

      // --------------------------------------------------------
      // Code quality
      // --------------------------------------------------------
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "no-throw-literal": "error",

      // --------------------------------------------------------
      // Debugging / logging
      // --------------------------------------------------------
      "no-debugger": "error",
      "no-console": "warn",

      // --------------------------------------------------------
      // Formatting
      // Prettier is the source of truth for formatting.
      // --------------------------------------------------------
      semi: ["error", "always"],
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "comma-dangle": ["error", "always-multiline"],
    },
  },

  // ============================================================
  // Prettier compatibility
  // ============================================================
  eslintConfigPrettier,
];