
const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');
  it ('entry', () => {
    assert.equal(baseConfig.entry.search, 'C:/Users/82198/Desktop/webpack/webpack-01/src/search/index.js')
  })
});
