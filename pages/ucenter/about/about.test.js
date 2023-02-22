// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/about/about.vue', () => {
	let page,isWX;
	beforeAll(async () => {
		try {
			isWX = process.env.UNI_PLATFORM === "mp-weixin"
			if(!isWX){
				page = await program.reLaunch('/pages/ucenter/about/about')
				await page.waitFor(500)
				console.log(await program.pageStack());
			}
		} catch (err) {
			console.log("err: ",err);
		}
	})
	
	it('screenshot', async () => {
		console.log("process.env.UNI_PLATFORM: ",process.env.UNI_PLATFORM);
		if (!isWX) {
			await program.screenshot({
				path: "static/screenshot/about.png" // 默认项目根目录
			})
			
			expect.assertions(1);
			expect((await page.data('about')).appName).toBe('uni-starter')
			
			await page.callMethod('navigateTo', {
				url: "https://ask.dcloud.net.cn/protocol.html",
				title: "用户服务条款"
			})
		}
	})

});
