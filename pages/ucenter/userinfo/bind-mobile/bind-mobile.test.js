// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start redirectTo

describe('pages/ucenter/userinfo/bind-mobile/bind-mobile.vue', () => {
	let page
	beforeAll( async ()=>{
		page = await program.navigateTo('/pages/ucenter/userinfo/bind-mobile/bind-mobile')
		await page.waitFor(500)
	})
	
	it('修改绑定手机号',async()=>{
		let phone = "17769516019" 
		await page.setData({
			formData: {
				"phone":phone
			}
		})
		expect(phone).toMatch(/^1\d{10}$/);
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const codeBtnMp = await page.$('uni-send-sms-code')
			const sendMsgResMp = await codeBtnMp.callMethod('sendMsg')
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
					expect(submitRes.msg).toBe("此手机号已绑定" || "手机号 is already bound")
					break;
				default:
					break;
			}
		}
		
		await program.switchTab('/pages/ucenter/ucenter')
		
		console.log(await program.currentPage(),"last-------------------");
	})
	
});