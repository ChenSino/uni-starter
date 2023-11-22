const path = require('path');
module.exports = {
	testTimeout: 20000,
	reporters: [
		'default'
	],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)","<rootDir>/uni_modules/uni-id-pages/**/*test.[jt]s?(x)"],
	testPathIgnorePatterns: ['/node_modules/'],
	testSequencer: path.join(__dirname, "testSequencer.js"),
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}


