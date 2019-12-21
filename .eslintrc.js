module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": "off",
    "linebreak-style": 0,
    "no-underscore-dangle": 0
  }
};
