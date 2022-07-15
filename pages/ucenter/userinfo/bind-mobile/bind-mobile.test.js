// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start redirectTo

describe('pages/ucenter/userinfo/bind-mobile/bind-mobile.vue', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.navigateTo('/pages/ucenter/userinfo/bind-mobile/bind-mobile')
			console.log("page: ", page);
			await page.waitFor(500)
			
			console.log("program.pageStack: ",await program.pageStack());
		} catch (e) {
			console.log("e: ", e);
		}
	})

	it('修改绑定手机号', async () => {
		await page.waitFor(300)
		console.log("formData:---------1 ", await page.data('formData'));

		const isPhone = await page.callMethod('isPhone')
		console.log("isPhone: ", isPhone);

		const isCode = await page.callMethod('isCode')
		console.log("isCode: ", isCode);

		
		let mobile = "17769516019"
		await page.setData({
			formData: {
				mobile
			}
		})
		expect(mobile).toMatch(/^1\d{10}$/);

		console.log("formData:--------2 ", await page.data('formData'));



		console.log("process.env.UNI_PLATFORM: ", process.env.UNI_PLATFORM);

		if(process.env.UNI_PLATFORM == "mp-weixin"){
			const codeBtnMp = await page.$('uni-send-sms-code')
			console.log("codeBtnMp: ",codeBtnMp);
			const sendMsgResMp = await codeBtnMp.callMethod('sendMsg')
			console.log("sendMsgResMp: ",sendMsgResMp);
			await page.waitFor(300)
		}else{
			const codebtn =  await page.$('.short-code-btn')
			console.log("codebtn: ",codebtn);
			const sendMsgRes = await codebtn.callMethod('sendMsg')
			console.log("sendMsgRes: ",sendMsgRes);
			await page.waitFor(300)
		}
		
		
		let code = "123456"
		await page.setData({formData: {code}})
		expect(code).toMatch(/^\d{6}$/);
		
		
		const submitRes = await page.callMethod('submit')
		await page.waitFor(300)
		console.log("submitRes: ",submitRes);
		
		if(submitRes){
			switch (submitRes.code){
				case  0:
					expect(submitRes.msg).toBe("手机号码绑定成功")
					await page.waitFor(300)
					console.log(await program.currentPage());
					expect((await program.currentPage()).path).toBe('/pages/ucenter/userinfo/userinfo')
					break;
				case  403:
					expect(submitRes.msg).toBe("缺少token")
					await page.waitFor(300)
					await program.redirectTo('/pages/ucenter/login-page/pwd-login/pwd-login')
					break;
				case  60101:
					// expect(submitRes.msg).toBe("此手机号已绑定" || "手机号 is already bound")
					expect(submitRes.errCode).toBe("uni-id-account-bound")
					break;
				case  50202:
					expect(submitRes.errCode).toBe("uni-id-invalid-verify-code")
					expect(submitRes.errMsg).toBe("短信验证码错误或已失效")
					break;
				case "SYS_ERR":
					console.log("未知错误---SYS_ERR",submitRes)
					break;
				default:
					console.log("submitRes.errMsg",submitRes.errMsg)
				
					break;
			}
		}
		// await program.switchTab('/pages/ucenter/ucenter')

		console.log(await program.currentPage(), "last-------------------");
	})

});
