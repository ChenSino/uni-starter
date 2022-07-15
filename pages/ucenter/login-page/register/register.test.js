// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start


describe('pages/ucenter/login-page/register/register.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.redirectTo('/pages/ucenter/login-page/register/register')
		await page.waitFor(500)
		console.log("program.pageStack: ",await program.pageStack());
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
				'pwd2': pwd2,
				"captcha": "1234"
			},
		})
		console.log(await page.data('formData'),"setData----formData");

		expect(username).toMatch(/^.{3,20}$/);
		expect(password).toMatch(/^.{6,20}$/);
		expect(pwd2).toMatch(/^.{6,20}$/);
		expect(pwd2).toEqual(password);

		await page.setData({
			agree: true
		})
		
		
		
		const resRegister = await page.waitFor(async () => {
			return await page.callMethod('submit')
		})
		
		console.log("resRegister: ",resRegister);
		
		
		switch (resRegister.code){
			case 0:
				console.log('注册成功')
				// expect(resRegister.userInfo.username).toBe("数字天堂");
				// 	await program.navigateTo('/pages/ucenter/settings/settings')
				break;
			case 20102:
				expect(resRegister.errMsg).toBe("此账号已注册");
				// expect(getUid.msg).toBe("此用户名已注册");
				// expect(getUid.msg).toBe("Account exists");
				// 	await program.navigateTo('/pages/ucenter/login-page/pwd-login/pwd-login')
				break;
			default:
				break;
		}
		
	}) 
})
