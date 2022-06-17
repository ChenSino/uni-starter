// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/pwd-retrieve/pwd-retrieve.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber=17769516019')
		await page.waitFor(500)
	})

	it('重置密码', async () => {
		await page.setData({
			formData: {
				"phone": "17769516019",
				'pwd': '222222',
				'pwd2': '222222',
				'code':'123456'
			}
		})
		console.log(await program.currentPage());
		await page.waitFor(200)
		// expect((await program.currentPage()).path).toBe('/pages/ucenter/settings/settings')
		
		const submitRes = await page.callMethod('submit')
		console.log("submitRes: ",submitRes);
		if(submitRes){
			switch (submitRes.code){
				case 0:
					expect(submitRes.msg).toBe('密码重置成功')
					break;
				case 10202:
					expect(submitRes.msg).toBe('此手机号尚未注册')
					break;
				default:
					break;
			}
		}		
	})
})
