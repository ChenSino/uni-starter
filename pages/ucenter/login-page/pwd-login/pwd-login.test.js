// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/login-page/pwd-login/pwd-login.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/login-page/pwd-login/pwd-login')
		// navigateTo
		// redirectTo
		await page.waitFor(500)
	})

	it('前往注册页', async () => {
		// expect.assertions(2);
		const resReg = await page.callMethod('toRegister')
		await page.waitFor(300)
		// expect((await program.currentPage()).path).toBe(
		// 	'pages/ucenter/login-page/register/register')
		console.log(await program.currentPage(),"111111111");
		await program.navigateBack()
		// await page.waitFor(500)
		// 执行 navigateBack 验证是否返回navigateTo
		// expect((await program.navigateBack()).path).toBe(
		// 	'pages/ucenter/login-page/pwd-login/pwd-login')
			
		console.log(await program.currentPage(),"22222222222");
	})
	
	it('screenshot', async () => {
		if (process.env.UNI_PLATFORM === "h5") {
			const image = await program.screenshot({
				path: "static/screenshot/pwdlogin-h5.png" // 默认项目根目录
			})
		} else if (process.env.UNI_PLATFORM === "app-plus") {
			await program.screenshot({
				path: "static/screenshot/pwdlogin-app.png"
			})
		} else if (process.env.UNI_PLATFORM === "mp-weixin") {
			await program.screenshot({
				path: "static/screenshot/pwdlogin-mp.png"
			})
		}
	
	})
	

	it('用户名密码登录', async () => {
		// expect.assertions(1);
		const setForm = await page.setData({
			"username": "数字天堂",
			"password": "111111",
			// "captcha":"test",
			"agree": true
		})
		
		const needCaptcha = await page.data('needCaptcha')
		console.log("needCaptcha---1: : ",needCaptcha);
		
		if(needCaptcha){
			await page.setData({
				"captcha":"test"
			})
			console.log("needCaptcha---2: ",await page.data('needCaptcha'));
		}
		
		
		const resLogin = await page.callMethod('pwdLogin')
		console.log("resLogin: ", resLogin);
		
		
		switch (resLogin.code){
			case 0:
				// console.log('resLogin.uid',resLogin.uid.length)
				expect(resLogin.uid).toHaveLength(24);
				break;
			case 10102:
				expect(resLogin.msg).toBe("密码错误");
				await page.setData({
					"username": "数字天堂",
					"password": "222222",
					"agree": true,
				})
				await page.callMethod('pwdLogin')
				break;
			case 10103:
				expect(resLogin.msg).toBe("密码错误次数过多");
				break;
			case 10002:
				expect(resLogin.msg).toBe("验证码不可为空");
				break;
			
			default:
				console.log(await program.currentPage(),"22222222222");
				break;
		}
	})

})
