// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.vue', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.reLaunch('/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile')
			await page.waitFor(500)
			console.log("await program.pageStack(): ", await program.pageStack());
		} catch (e) {
			console.log("e: ",e);
		}
		
	})
	
	it('绑定手机号', async () => {
		
		await page.setData({
			formData: {
				mobile: "17769516019",
				code: "123456",
				captcha: "1234"
			},
		})
		
		await page.waitFor(300)
		const submitRes = await page.callMethod('submit')
		console.log("submitRes: ",submitRes);
		
		
		switch (submitRes.errCode){
			case "uni-id-mobile-verify-code-error":
				expect(submitRes.errMsg).toBe("手机验证码错误或已过期");
				break;
			case "uni-captcha-verify-fail":
				expect(submitRes.errMsg).toBe("验证码错误");
				break;
			case "uni-id-param-required":
				expect(submitRes.errMsg).toBe("缺少参数: token");
				break;
			default:
				console.log(await program.currentPage(),"currentPage---------");
				break;
		}
		
	})


});
