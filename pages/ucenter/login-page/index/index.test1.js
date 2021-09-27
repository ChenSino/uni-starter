// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start
describe('pages/ucenter/login-page/index/index.vue', () => {

	let page
	beforeAll(async () => {
		page = await program.navigateTo('/pages/ucenter/login-page/index/index?type=smsCode')
		await page.waitFor(500)
	})

	it('检查', async () => {

		console.log(await program.currentPage());
		const perPage = await page.$('.content')
		const getTitle = await perPage.$('.title')

		console.log(await getTitle.text());

		// if ((await program.currentPage()).path == 'pages/ucenter/login-page/index/index') {
		// 	expect(await getTitle.text()).toBe('登录后即可展示自己')
		// }

	})

	it('手机号', async () => {

		const setInput = await page.setData({
			"phone": '17769516019',
			"agree": true,
		})
		await page.waitFor(300)
		console.log(await page.data('phone'), "phone----------");
		console.log(await page.data('agree'), "agree-----------");


		const agreeTrue = await page.waitFor(async () => {
			return await page.data('agree')
		}) 
		console.log("agreeTrue: ", agreeTrue);

		await page.callMethod('sendShortMsg')
		await page.waitFor(300)
		console.log(await program.currentPage());
		// except((await program.currentPage()).path).toBe('pages/ucenter/login-page/phone-code/phone-code?phoneNumber=17769516019')


		// if (process.env.UNI_PLATFORM === "h5") {
		// 	const elInput = await page.$('.input-box')
		// 	console.log("elInput: ",elInput);

		// 	console.log(await elInput.attribute('src'));

		// }

	})
})
