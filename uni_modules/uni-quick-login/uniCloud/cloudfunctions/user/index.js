'use strict';
const uniID = require('uni-id')
const uniCaptcha = require('uni-captcha')
const db = uniCloud.database()
const dbCmd = db.command
let params,context,res;
class User {
	async quickLogin(){
		let {access_token,openid,type} = params
		switch (type){
			case 'weixin':
				let userinfo_res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/userinfo',
				{
					method: 'GET',
					dataType:"json",
					data:{ access_token,openid}
				});
				return userinfo_res.data//根据access_token,openid得到userinfo
				//检查是否已经注册...
				break;
			case 'univerify':
				return uniID.loginByUniverify({access_token,openid})
				break;
			case 'apple':
				return await uniID.loginByApple(params)
				break;
			default:
				return {"code":100,"msg":"暂不提供"+type+"登陆的云端接口演示"}
				break;
		}
	}
	async sendSmsCode(){
		// 简单限制一下客户端调用频率
		const ipLimit = await db.collection('uni-verify').where({
			ip: context.CLIENTIP,
			created_at: dbCmd.gt(Date.now() - 60000)
		}).get()
		if (ipLimit.data.length > 0) {
			return {
				code: 429,
				msg: '请求过于频繁'
			}
		}
		const templateId = '11753' // 替换为自己申请的模板id
		if (!templateId) {
			return {
				code: 500,
				msg: 'sendSmsCode需要传入自己的templateId，参考https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=sendsmscode'
			}
		}
		const randomStr = '00000' + Math.floor(Math.random() * 1000000)
		const code = randomStr.substring(randomStr.length - 6)
		return await uniID.sendSmsCode({
			mobile: params.mobile,
			code,
			type: params.type,
			templateId
		})
	}
}
const userClass = new User();
exports.main = async (event, ctx) => {
	[{params},context] = [event,ctx]
	//1.判断需要token的action是否有token
	/*let noCheckAction = ['register', 'loginByWeixin', 'checkToken','login', 'logout', 'sendSmsCode','loginBySms', 'inviteLogin', 'loginByUniverify','loginByApple', 'createCaptcha', 'verifyCaptcha','refreshCaptcha']
	if(!noCheckAction.includes(event.action)) {
		if (!event.uniIdToken) {
			return {"code":403,"msg":"缺少token"}
		}
		let payload = {}
		payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}*/
	try{
		return await userClass[event.action]()||res;
	}catch(err){
		return  {"code":404,"msg":err}
	}
}