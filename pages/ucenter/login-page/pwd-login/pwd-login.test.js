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
			console.log(await program.currentPage(),"111111111");
		await page.waitFor(500)
		// 执行 navigateBack 验证是否返回navigateTo
		expect((await program.navigateBack()).path).toBe(
			'pages/ucenter/login-page/pwd-login/pwd-login')
			
			console.log(await program.currentPage(),"22222222222");
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
		
		switch (resLogin.msg){
			case 10102:
				expect(resLogin.msg).toBe("密码错误");
				await page.setData({
					"password": "222222",
					"username": "数字天堂",
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
			case 0:
				expect(resLogin.msg).toBe("登录成功");
				break;
			default:
				break;
		}
	})

})
