// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/about/about.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.redirectTo('/pages/ucenter/about/about')
		await page.waitFor(500)
	})

	it('about', async () => {
		expect.assertions(2);
		const getData = await page.data('about')
		console.log("getData-----------: ", getData);
		expect(getData.appName).toBe('uni-starter')
		expect(getData.slogan).toBe('云端一体应用快速开发模版')
	})

	it('screenshot', async () => {
		console.log(process.env.UNI_PLATFORM, "PLATFORM----------");
		if (process.env.UNI_PLATFORM === "h5") {
			const image = await program.screenshot({
				path: "static/screenshot/about-h5.png" // 默认项目根目录
			})
			console.log(image, "image--------------------")
		} else if (process.env.UNI_PLATFORM === "app-plus") {
			await program.screenshot({
				path: "static/screenshot/about-app.png"
			})
		} else if (process.env.UNI_PLATFORM === "mp-weixin") {
			await program.screenshot({
				path: "static/screenshot/about-mp.jpg"
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
