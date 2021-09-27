// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/phone-code/phone-code.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/login-page/phone-code/phone-code')
		await page.waitFor(500)
	})
// ?phoneNumber=17769516019
	it('获取短信验证码', async () => {
		
		const initClickRes = await page.callMethod('initClick')
		console.log("initClickRes: ",initClickRes);
		
		console.log(await page.data('count'));
		
		await page.waitFor(500)
		
		await page.setData({
			"code":"123456"
		})
		
		expect(await page.data('code').length).toBe(6)
		
		
		const submitRes =  await page.callMethod('submit')
		console.log("submitRes: ",submitRes);
		
		// expect(submitRes.msg).toBe('注册成功')
		
		console.log(await program.currentPage());
		// 登录成功后，/pages/ucenter/settings/settings
		
		
	})
})
