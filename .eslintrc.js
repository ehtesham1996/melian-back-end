module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@src", "./src"]
        ],
        extensions: [
          ".ts",
          ".js"
        ]
      }
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    "@typescript-eslint/indent": [2, 2],
    "no-console" : "off",
    "no-underscore-dangle" : "off",
    "import/no-unresolved": [2, {"commonjs": true, "amd": true}],
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "never"],
    "import/extensions"  : "off",
    "camelcase" : "error",
    "no-trailing-spaces" : "error",
    "max-len": ["error", {
      "code":  150,
      "ignoreComments":  true,
      "ignoreTrailingComments":  true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }]
  },
};
