// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/about/about.vue', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/about/about')
			console.log("page: ",page);
			await page.waitFor(500)
		} catch (e) {
			console.log("e: ",e);
		}
		
	})

	it('about', async () => {
		// expect.assertions(1);
		const getData = await page.data('about')
		console.log("getData: ",getData);
		// expect(getData.appName).toBe('uni-starter')
	})

	it('screenshot', async () => {
		if (process.env.UNI_PLATFORM == "h5") {
			const image = await program.screenshot({
				path: "static/screenshot/about-h5.png" // 默认项目根目录
			})
			console.log("image: ",image);
		} else if (process.env.UNI_PLATFORM == "app-plus") {
			console.log('app-plus');
			await program.screenshot({
				path: "static/screenshot/about-app.png"
			})
		} else if (process.env.UNI_PLATFORM == "mp-weixin") {
			console.log('mp-weixin');
			await program.screenshot({
				path: "static/screenshot/about-mp.png"
			})
		}

	})


	it('隐私政策协议-点击跳转', async () => {
		await page.callMethod('navigateTo', {
			url: "https://ask.dcloud.net.cn/protocol.html",
			title: "用户服务条款"
		})
	})

});
