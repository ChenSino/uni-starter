// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/index/index.vue', () => {

	let page
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/login-page/index/index?type=smsCode')
			await page.waitFor(500)
			console.log("await program.pageStack(): ",await program.pageStack());
		} catch (e) {
			console.log("e: ",e);
		}
	})

	it('smsCode-login', async () => {
		const perPage = await page.$('.content')
		const getTitle = await perPage.$('.title')
		// console.log(await getTitle.text());
		
		if ((await program.currentPage()).path == 'pages/ucenter/login-page/index/index') {
			console.log(await getTitle.text(),"1-------------");
			// expect(await getTitle.text()).toBe('登录后即可展示自己')
			
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
			
			await page.callMethod('sendShortMsg')
			await page.waitFor(300)
			//pages/ucenter/login-page/phone-code/phone-code
		}
		
		if ((await program.currentPage()).path == 'pages/ucenter/login-page/pwd-login/pwd-login') {
			console.log(await getTitle.text(),"2-------------");
			// expect(await getTitle.text()).toBe('用户名密码登录')
		}
		console.log("currentPage:---------- ",await program.currentPage());
	})
})





