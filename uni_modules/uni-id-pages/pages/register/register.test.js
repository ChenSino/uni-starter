describe('uni_modules/uni-id-pages/pages/register/register.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/uni_modules/uni-id-pages/pages/register/register')
		await page.waitFor(500)
		// console.log("program.pageStack: ", await program.pageStack());
	})

	it('注册账号', async () => {

		// expect.assertions(1);
		let username = "DCloud"
		let nickname = "DCloud"
		let password = "dcloud2022"
		let password2 = "dcloud2022"

		const setInput = await page.setData({
			formData: {
				"username": username,
				"nickname": nickname,
				'password': password,
				'password2': password2,
				"captcha": "1234",
				isAgree: true,
				needPopupAgreements:false
			},
		})
		console.log(await page.data('formData'), "setData----formData");
		
		// expect(username).toMatch(/^1\d{10}$/);
		expect(password).toMatch(/^.{6,20}$/);
		expect(password2).toMatch(/^.{6,20}$/);
		expect(password2).toEqual(password);
		
		
		if (process.env.UNI_PLATFORM != "mp-weixin") {
			console.log(process.env.UNI_PLATFORM);
			const element = await page.$('.uni-content')
			const agreeEl = await element.$('.root')
			console.log(await agreeEl.data('isAgree'), "isAgree----")
			await agreeEl.setData({
				isAgree: true
			})
		}
		await page.waitFor(300)
		
		const resLogin = await page.callMethod('submit')
		console.log("resLogin: ", resLogin);

		switch (resLogin.errCode) {
			case 0:
				console.log('注册成功')
				expect(resLogin.uid).toHaveLength(24);
				break;
			case "uni-id-account-exists":
				expect(resLogin.errMsg).toBe("此账号已注册");
				await page.waitFor(300)
				await page.callMethod('toLogin')
				break;
			case "FunctionTimeout":
				expect(resLogin.errMsg).toBe("[uni-id-co]: 请求云函数超时");
				await page.waitFor(300)
				const captchaEl = await page.$('.captcha-box')
				console.log('captchaEl',captchaEl)
				await captchaEl.callMethod('getImageCaptcha')
				break;
			case "uni-captcha-verify-fail":
				expect(resLogin.errMsg).toBe("验证码错误");
				break;
			default:
				console.log(await program.currentPage(), "----------");
				break;
		}
	})
})
