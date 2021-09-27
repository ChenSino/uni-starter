// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/login-page/pwd-login/pwd-login.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.redirectTo('/pages/ucenter/login-page/pwd-login/pwd-login')
		await page.waitFor(500)
	})

	it('前往注册页', async () => {
		// expect.assertions(2);
		const resReg = await page.callMethod('toRegister')
		await page.waitFor(300)
		expect((await program.currentPage()).path).toBe(
			'pages/ucenter/login-page/register/register')
		await page.waitFor(500)
		// 执行 navigateBack 验证是否返回
		expect((await program.navigateBack()).path).toBe(
			'pages/ucenter/login-page/pwd-login/pwd-login')
	})

	it('跳转到忘记密码页', async () => {
		const resPwd = await page.callMethod('toRetrievePwd')

		await page.waitFor(300)
		expect((await program.currentPage()).path).toBe(
			'pages/ucenter/login-page/pwd-retrieve/pwd-retrieve')

		await page.waitFor(500)
		// 执行 navigateBack 验证是否返回
		expect((await program.navigateBack()).path).toBe(
			'pages/ucenter/login-page/pwd-login/pwd-login')
	})

	it('用户名密码登录', async () => {
		// expect.assertions(1);
		const setForm = await page.setData({
			"password": "111111",
			"username": "数字天堂",
			"agree": true,
		})
		const resLogin = await page.callMethod('pwdLogin')
		console.log("resLogin: ", resLogin.msg);
		expect(resLogin.msg).toBe("登录成功");
	})

})
