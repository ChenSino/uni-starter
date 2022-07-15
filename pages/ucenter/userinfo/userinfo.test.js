// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/userinfo/userinfo.vue', () => {

	let page,uniToken;
	beforeAll(async () => {
		try{
			page = await program.reLaunch('/pages/ucenter/userinfo/userinfo')
			await page.waitFor(500)
			uniToken = await page.data('uniToken')
			console.log("uniToken: ",uniToken);
			console.log("program.pageStack: ",await program.pageStack());
		}catch(e){
			//TODO handle the exception
			console.log("e: ",e);
		}
	})

	
	it('设置昵称', async () => {
		const name = "数字天堂DCloud" +  Math.round(Math.random()*10);
		await page.waitFor(300)
		const nicknameRes = await page.callMethod("setNickname",name)
		if(nicknameRes.updated){
			expect(nicknameRes.updated).toBe(1)
		}else{
			console.log("设置昵称失败");
		}
		
	})
	
	it('绑定手机号', async () => {
		await page.callMethod('bindMobileBySmsCode')
		
		await page.waitFor(1000)
		expect((await program.currentPage()).path).toBe('pages/ucenter/userinfo/bind-mobile/bind-mobile')
		console.log("currentPage---------------- ",await program.currentPage());
		// expect((await program.navigateBack()).path).toBe('pages/ucenter/userinfo/userinfo')
	})
	
})
