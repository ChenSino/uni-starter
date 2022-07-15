// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('pages/ucenter/login-page/pwd-login/pwd-login.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/login-page/pwd-login/pwd-login')
		await page.waitFor(500)
		console.log("program.pageStack: ",await program.pageStack());
	})

	it('前往注册页', async () => {
		// expect.assertions(2);
		const resReg = await page.callMethod('toRegister')
		await page.waitFor(300)
		// expect((await program.currentPage()).path).toBe(
		// 	'pages/ucenter/login-page/register/register')
		await program.navigateBack()
		// await page.waitFor(500)
		// 执行 navigateBack 验证是否返回navigateTo
		// expect((await program.navigateBack()).path).toBe(
		// 	'pages/ucenter/login-page/pwd-login/pwd-login')
			
		// console.log(await program.currentPage(),"22222222222");
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
		console.log("resLogin: ", resLogin.code);
		
		
		switch (resLogin.code){
			case 0:
				console.log('登录成功')
				expect(resLogin.uid).toHaveLength(24);
				console.log(await program.currentPage(),"currentPage---------");
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
			case "SYS_ERR":
				console.log("未知错误---SYS_ERR",resLogin)
				break;
			default:
				// console.log(await program.currentPage(),"22222222222");
				break;
		}
	})

})
