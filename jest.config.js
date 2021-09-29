const path = require('path');
module.exports = {
    testTimeout: 10000,
    reporters: [
        'default'
    ],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    moduleFileExtensions: ['js', 'json'],
    rootDir: __dirname,
	 testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)"],
	 // testMatch: ["<rootDir>/pages/ucenter/about/about.test.js"],
    testPathIgnorePatterns: ['/node_modules/'],
	 testSequencer:path.join(__dirname, "testSequencer.js")
	 //pages/ucenter/userinfo/userinfo.test.js
	 //pages/ucenter/login-page/pwd-login/pwd-login.test.js
	 
	 
}
