// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/userinfo/userinfo.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/userinfo/userinfo')
		await page.waitFor(500)
	})

	
	it('设置昵称', async () => {
		const getTokenRes =  await page.waitFor(async()=>{
			return await page.data('uniToken')
		})
		console.log("getTokenRes:---------------------- ",getTokenRes);
		
		var name = "数字天堂DCloud" +  Math.round(Math.random()*10);
		console.log("name: ",name);
		if(getTokenRes){
			const nicknameRes = await page.callMethod("setNickname",name)
			await page.waitFor(300)
			console.log("nicknameRes: ",nicknameRes);
			expect(nicknameRes.updated).toBe(1)
		}
		
	})
	
	it('绑定手机号', async () => {
		await page.callMethod('bindMobileBySmsCode')
		await page.waitFor(300)
		// expect((await program.currentPage()).path).toBe('pages/ucenter/userinfo/bind-mobile/bind-mobile')
		// await page.waitFor(300)
		expect((await program.navigateBack()).path).toBe('pages/ucenter/userinfo/userinfo')
	})
	
})
