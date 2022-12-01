// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.io/collocation/auto/hbuilderx-extension/index

describe('uni_modules/uni-id-pages/pages/userinfo/userinfo.vue', () => {

	let page;
	beforeAll(async () => {
		page = await program.navigateTo('/uni_modules/uni-id-pages/pages/userinfo/userinfo')
		await page.waitFor(500)
		// page = await program.currentPage()
		console.log("program.pageStack: ", await program.pageStack());
	});

	it("昵称", async () => {
		const nickname = "数字天堂DCloud" + Math.round(Math.random() * 10);
		await page.waitFor(300)
		await page.callMethod("setNickname", nickname)
	})
	
	it("头像", async () => {
		
		const imgs = [
			"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-52b18b34-3a3e-4861-89a0-c362c7634787/5105c383-8d83-4f40-938e-7c32c5983f8d.png",
			"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-52b18b34-3a3e-4861-89a0-c362c7634787/61869c72-3117-4ea4-8d6d-ebb67617c7d9.jpg",
			"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-52b18b34-3a3e-4861-89a0-c362c7634787/558cde0a-b514-4de7-8c7d-1d6b733f9440.png"]
		
		const avatar_file = {
			url:imgs[Math.floor(Math.random()*imgs.length)]
		}
		console.log("avatar_file: ",avatar_file);
		
		if (process.env.UNI_PLATFORM != "mp-weixin") {
			const elBox = await page.$('.box')
			await elBox.callMethod('setAvatarFile',avatar_file)
		}else{
			await page.waitFor(500)
			await program.screenshot({
				path: "static/screenshot/userinfo.png" // 默认项目根目录
			})
		}
		
		// if (process.env.UNI_PLATFORM != "mp-weixin") {
		// 	await program.screenshot({
		// 		path: "static/screenshot/userinfo.png" // 默认项目根目录
		// 	})
		// }
		
	})
	
	
});
