module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "ignorePatterns": [
    "**/.git",
    "**/.svn",
    "**/.hg",
    " **/node_modules",
    ".env",
    ".env.example",
    " **/.yml",
    "**/.yaml",
    "Dockerfile",
    ".gitignore",
    "**/.idea",
    "**/.husky",
  ],
  "rules": {
    "no-prototype-builtins": 0,
    "no-fallthrough": 0,
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 ,  "ignoredNodes": ["ConditionalExpression"] },
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
