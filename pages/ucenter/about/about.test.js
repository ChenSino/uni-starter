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
			}
		} catch (err) {
			console.log("err: ",err);
		}
	})
	it('navigateTo-protocol', async () => {
		if(isWX){return}
		expect.assertions(1);
		expect((await page.data('about')).appName).toBe('uni-starter')
		await page.waitFor(500)
		await page.callMethod('navigateTo', {
			url: "https://ask.dcloud.net.cn/protocol.html",
			title: "用户服务条款"
		})
	})
});
