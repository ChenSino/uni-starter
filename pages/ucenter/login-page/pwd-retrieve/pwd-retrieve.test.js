// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/pwd-retrieve/pwd-retrieve.vue', () => {

	let page,abled;
	beforeAll(async () => {
		try {
			page = await program.navigateTo(
				'/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber=17769516019')
			await page.waitFor(500)
			console.log("await program.pageStack(): ", await program.pageStack());
		} catch (e) {
			console.log("e: ", e);
		}
	})

	it('重置密码之前', async () => {

		const element = await page.$('.send-btn-box')
		abled = await element.attribute('disabled')
		
		await page.setData({
			formData: {
				"phone": "17769516019",
				'code': '123456',
				'pwd': '222222',
				'pwd2': '222222',
		
			}
		})
	});

	it('重置密码', async () => {

		if(abled){
			const submitRes = await page.callMethod('submit')
			console.log("submitRes: ", submitRes);
			
			if (submitRes) {
				switch (submitRes.code) {
					case 0:
						console.log("密码重置成功")
						expect(submitRes.errCode).toBe(0)
						// expect(submitRes.errMsg).toBe('密码重置成功')
						break;
					case 10202:
						expect(submitRes.errMsg).toBe('此手机号尚未注册')
						break;
					case 50202:
						expect(submitRes.errCode).toBe("uni-id-invalid-verify-code")
						expect(submitRes.errMsg).toBe("短信验证码错误或已失效")
						console.log("process.env.UNI_PLATFORM",process.env.UNI_PLATFORM)
						break;
					default:
						break;
				}
			}else{
				console.log("err")
			}
		}
	})
})
