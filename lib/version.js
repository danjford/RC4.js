var packageInfo = require('../package.json');

module.exports = {
  full: packageInfo.version,
  major: packageInfo.version.split('.')[0],
  minor: packageInfo.version.split('.')[1],
  dot: packageInfo.version.split('.')[2],
  author: packageInfo.author
};