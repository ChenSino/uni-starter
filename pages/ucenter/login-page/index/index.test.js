// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/index/index.vue', () => {

	let page
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/login-page/index/index?type=smsCode')
			console.log("page: ",page);
		} catch (e) {
			console.log("e: ",e);
		}
		await page.waitFor(1000)
		console.log("await program.pageStack(): ",await program.pageStack());
	})


	it('smsCode-login', async () => {
		const image = await program.screenshot({
			path: "static/screenshot/login-index.png" // 默认项目根目录
		})

		const perPage = await page.$('.content')
		// console.log("perPage: ", perPage);
		const getTitle = await perPage.$('.title')
		console.log("getTitle: ",getTitle);
		// console.log(await getTitle.text());
		
		
		console.log("await program.currentPage(): ",await program.currentPage());
		

		if ((await program.currentPage()).path == 'pages/ucenter/login-page/index/index') {
			expect(await getTitle.text()).toBe('登录后即可展示自己')
			
			const setInput = await page.setData({
				"phone": '17769516019',
				"agree": true,
				// "type":"smsCode"
			})
			await page.waitFor(300)
			console.log(await page.data('phone'), "phone----------");
			console.log(await page.data('agree'), "agree-----------");
			console.log(await page.data('type'), "type----------");
			
			const agreeTrue = await page.waitFor(async () => {
				return await page.data('agree')
			})
			console.log("agreeTrue: ", agreeTrue);
			
			await page.callMethod('sendShortMsg')
			await page.waitFor(300)
			// console.log((await program.currentPage()).path);
			//pages/ucenter/login-page/phone-code/phone-code
			
		}
		
		if ((await program.currentPage()).path == 'pages/ucenter/login-page/pwd-login/pwd-login') {
			expect(await getTitle.text()).toBe('用户名密码登录')
			
		}

	})
})
