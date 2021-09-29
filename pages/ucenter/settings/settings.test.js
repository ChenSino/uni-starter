// uniapp自动化测试教程: https://uniapp-test.dcloud.net.cn/docs/testcase/start

// import {mapGetters} from 'vuex';

describe('pages/ucenter/settings/settings', () => {
	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/settings/settings')
		await page.waitFor(500)
	})
	
	
	
	it('切换语言', async () => {
		console.log(await page.data('uniToken'),'uniToken-------------------------');
		// await page.callMethod('changeLanguage') 弹框不支持点击
		console.log((await program.currentPage()).path);
		
		
		if (process.env.UNI_PLATFORM === "app-plus") {
			//清理缓存
			await page.callMethod('clearTmp')
			console.log("clearTmp: -------------");
			
			
			
			console.log(await page.data('pushIsOn'),"pushIsOn-------------");
			
			
			 const pushRes = await page.data('pushIsOn')
			
			if(pushRes == "wait"){
				await page.callMethod('pushServer.off')
				
				console.log("pushServer---------");
			}
			
			
		}
		
		
		
		
		
		
	})
	
	
	it('退出登录', async () => {
		const perPage = await page.$('.content')
		const uList = await perPage.$('.userInfo-class')
		await page.waitFor(300)
		const getTokenRes =  await page.waitFor(async()=>{
			return await page.data('uniToken')
		})
		console.log("getTokenRes: ",getTokenRes);
		await page.callMethod('clickLogout')
		console.log((await program.currentPage()).path);
	})
	
	
});