const Sequencer = require("@jest/test-sequencer").default;
const sortTestFilenames = ["list.test.js","search.test.js","register.test.js","login-withpwd.test.js","grid.test.js","ucenter.test.js","about.test.js","userinfo.test.js","bind-mobile.test.js","change_pwd.test.js","settings.test.js"];
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

// ,"ucenter.test.js","userinfo.test.js","pwd-retrieve.test.js","bind-mobile.test.js","settings.test.js","index.test.js"