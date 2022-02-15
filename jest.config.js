const path = require('path');
module.exports = {
    testTimeout: 20000,
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
}
