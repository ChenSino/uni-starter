// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start


describe('pages/ucenter/login-page/register/register.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.redirectTo('/pages/ucenter/login-page/register/register')
		await page.waitFor(500)
	})

	 it('注册账号', async () => {

		let username = "数字天堂"
		let nickname = "DCloud"
		let password = "111111"
		let pwd2 = "111111"

		const setInput = await page.setData({
			formData: {
				"username": username,
				"nickname": nickname,
				'password': password,
				'pwd2': pwd2
			},
		})
		// console.log(await page.data('formData'),"0000000000000");

		expect(username).toMatch(/^.{3,20}$/);
		expect(password).toMatch(/^.{6,20}$/);
		expect(pwd2).toMatch(/^.{6,20}$/);
		expect(pwd2).toEqual(password);

		await page.setData({
			agree: true
		})

		const getUid = await page.waitFor(async () => {
			const resRegister = await page.callMethod('submit')
			await page.waitFor(300)
			return resRegister
		})

		console.log("getUid:---------- ",getUid.msg);
		if (getUid.uid) {
			expect(getUid.msg).toBe("注册成功");
			expect(getUid.userInfo.username).toBe("数字天堂");
			await program.navigateTo('/pages/ucenter/settings/settings')
		} else {
			expect(getUid.msg).toBe("此用户名已注册");
			await program.navigateTo('/pages/ucenter/login-page/pwd-login/pwd-login')
		}
	}) 
})
