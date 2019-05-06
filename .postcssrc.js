const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const browsers = pkg.browserslist;
const presetEnvConfig = { browsers };

module.exports = {
  parser: 'postcss-scss',
  plugins: [require('postcss-utilities'), require('postcss-preset-env')(presetEnvConfig)]
};
