const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "coverage/**", "dist/**", "build/**", ".env"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Possible bugs
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-undef": "error",
      "no-unreachable": "error",

      // Code quality
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",

      // Better error handling
      "no-throw-literal": "error",

      // Clean code
      "no-console": "warn",
      "no-debugger": "error",

      // Prevent accidental semicolon issues
      semi: ["error", "always"],

      // Consistent quotes
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],

      // Consistent commas
      "comma-dangle": ["error", "always-multiline"],
    },
  },

  // Disable ESLint formatting rules that conflict with Prettier
  eslintConfigPrettier,
];
