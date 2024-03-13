// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.io/collocation/auto/hbuilderx-extension/index
const PAGE_PATH = '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
describe('userinfo',() => {
	let page,uniToken;
	beforeAll(async () => {
		page = await program.navigateTo(PAGE_PATH)
		await page.waitFor("view")
		console.log("pageStack: ",await program.pageStack());
		uniToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
		console.log("uniToken: ",uniToken);
	});
	if(uniToken){
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
			console.log("process.env.UNI_PLATFORM: ",process.env.UNI_PLATFORM);
			// if (process.env.UNI_PLATFORM != "mp-weixin") {
			// 	const avatarCom = await page.$('.avatar')
			// 	console.log("avatarCom: ",avatarCom);
			// 	const elBox = await avatarCom.$('.box')
			// 	console.log("elBox: ",elBox);
			// 	// const elBox = await page.$('.box')
			// 	await elBox.callMethod('setAvatarFile',avatar_file)
			// 	await elBox.waitFor(500)
			// }
		})
	}
	it("screenshot", async () => {
		await program.screenshot({
			path: "static/screenshot/userinfo.png" // 默认项目根目录
		})
		await page.waitFor(500)
	})
});
