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
		expect.assertions(1);
		expect((await page.data('about')).appName).toBe('uni-starter')
		
		if (process.env.UNI_PLATFORM === "app-plus") {
			await program.screenshot({
				path: "static/screenshot/about-app.png" // 默认项目根目录
			})
			
			await page.callMethod('navigateTo', {
				url: "https://ask.dcloud.net.cn/protocol.html",
				title: "用户服务条款"
			})
		}else if(process.env.UNI_PLATFORM === "mp-weixin"){
			await program.screenshot({
				path: "static/screenshot/about-weixin.png" // 默认项目根目录
			})
		}else if(process.env.UNI_PLATFORM === "h5"){
			await program.screenshot({
				path: "static/screenshot/about-h5.png" // 默认项目根目录
			})
		}
	})

});
