module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [".eslintrc.js", "dist/**/*"],
  rules: {
    // ESLint
    "no-console": "warn",
    "no-unused-vars": "off",
    "prefer-const": "error",
    "no-var": "error",
  },
};
