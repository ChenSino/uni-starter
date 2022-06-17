const Sequencer = require("@jest/test-sequencer").default;
const sortTestFilenames = ["register.test.js","pwd-login.test.js","userinfo.test.js","ucenter.test.js","search.test.js","grid.test.js","bind-mobile.test.js","pwd-retrieve.test.js","about.test.js","list.test.js","settings.test.js","index.test.js"];
class CustomSequencer extends Sequencer {
  sort(tests) {
    // 测试例排序
    const copyTests = Array.from(tests);
    const sortTests = sortTestFilenames
      .map((filename) => {
        return copyTests.find((test) => test.path.endsWith(filename));
      })
      .filter(Boolean);
    console.log(sortTests);
    return [...new Set([...sortTests, ...copyTests])];
  }
}
module.exports = CustomSequencer;