const path = require('path');
module.exports = {
	testTimeout: 40000,
	reporters: [
		'default'
	],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	/* testEnvironmentOptions: {
		compile: true,
		"app-plus": { // 需要安装 HBuilderX
			android: {
				// appid: "", //配置manifest.json中的appid
				// package: "", //Android包名
				// executablePath: "D:/xm/online-code/uni-starter/unpackage/debug/android_debug.apk" ,// 自定义调试基座包路径
				executablePath: "HBuilderX/plugins/launcher/base/android_base.apk" ,// apk 目录
			},
			ios: {
				// uuid 必须配置，目前仅支持模拟器，可以（xcrun simctl list）查看要使用的模拟器 uuid
				id: "",
				executablePath: "HBuilderX/plugins/launcher/base/Pandora_simulator.app" // ipa 目录
			}
		}
	}, */
	testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)"],
	testPathIgnorePatterns: ['/node_modules/'],
	testSequencer: path.join(__dirname, "testSequencer.js")
}


