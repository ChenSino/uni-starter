const Sequencer = require("@jest/test-sequencer").default;
const sortTestFilenames = ["list.test.js","search.test.js","grid.test.js","register.test.js","about.test.js","login-withpwd.test.js","ucenter.test.js","userinfo.test.js","settings.test.js"];
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
