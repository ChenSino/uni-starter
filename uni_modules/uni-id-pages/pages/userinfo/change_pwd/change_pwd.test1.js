// jest官方文档: https://www.jestjs.cn/
// uniapp自动化测试教程: https://uniapp.dcloud.io/collocation/auto/quick-start

describe('uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.vue', () => {
	let page
	beforeAll(async () => {
		try {
			page = await program.reLaunch('/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd')
			await page.waitFor(500)
			console.log("await program.pageStack(): ", await program.pageStack());
		} catch (e) {
			console.log("e: ",e);
		}
	})
	it('修改密码', async () => {
		await page.setData({
			formData: {
				oldPassword: "dcloud2022",
				newPassword: "unistarter2022",
				newPassword2: "unistarter2022"
			}
		})
		console.log(await page.data('formData'));
		await page.waitFor(300)
		const submitRes = await page.callMethod('submit')
		console.log("submitRes: ",submitRes);
		switch (submitRes.errCode){
			case 0:
				console.log('修改成功')
				break;
			case "uni-id-param-required":
				expect(submitRes.errMsg).toBe("缺少参数: token");
				break;
			case "uni-id-password-error":
				expect(submitRes.errMsg).toBe("密码错误");
				break;
			default:
				console.log(await program.currentPage(),"currentPage---------");
				break;
		}
	})
});
