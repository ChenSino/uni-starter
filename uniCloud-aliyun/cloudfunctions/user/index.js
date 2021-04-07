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
			default:
				break;
		}
	}
	/*
	
	async loginLog(){
		const now = Date.now()
		const uniIdLogCollection = db.collection('uni-id-log')
		let logData = {
			deviceId: params.deviceId || context.DEVICEID,
			ip: params.ip || context.CLIENTIP,
			type:"login",
			ua: context.CLIENTUA,
			create_date: now
		};
		Object.assign(logData,
			res.code === 0 ? {
				user_id: res.uid,
				state: 1
			} : {
				state: 0
			})
		return await uniIdLogCollection.add(logData)
	}
	async register(){
		return await uniID.register(params);
	}
	async login(){
		let passed = false;
		let needCaptcha = await getNeedCaptcha();
		
		if (needCaptcha) {
			res = await uniCaptcha.verify(params)
			if (res.code === 0) passed = true;
		}
		
		if (!needCaptcha || passed) {
			res = await uniID.login(params);
			await loginLog(res);
			needCaptcha = await getNeedCaptcha();
		}
		
		res.needCaptcha = needCaptcha;
	}
	async loginByWeixin(){
	}
	async checkToken(){
		return uniID.checkToken(event.uniIdToken);
	}
	async logout(){
		return await uniID.logout(event.uniIdToken)
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
		const templateId = '' // 替换为自己申请的模板id
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
	async loginBySms(){
		if (!params.code) {
			return {
				code: 500,
				msg: '请填写验证码'
			}
		}
		if (!/^1\d{10}$/.test(params.mobile)) {
			return {
				code: 500,
				msg: '手机号码填写错误'
			}
		}
		res = await uniID.loginBySms(params)
		loginLog(res)
	}
	async inviteLogin(){
		if (!params.code) {
			return {
				code: 500,
				msg: '请填写验证码'
			}
		}
		res = await uniID.loginBySms({
			...params,
			type: 'register'
		})
	}
	async getInviteCode(){
		let res = await uniID.getUserInfo({
			uid: params.uid,
			field: ['my_invite_code']
		})
		if (res.code === 0) {
			res.myInviteCode = res.userInfo.my_invite_code
			delete res.userInfo
		}
	}
	async getInvitedUser(){
		return uniID.getInvitedUser(params)
	}
	async loginByUniverify(){
		return await uniID.loginByUniverify(params)
	}
	async loginByApple(){
		res = await uniID.loginByApple(params)
		loginLog(res)
	}
	async updatePwd(){
		return await uniID.updatePwd({
			uid: params.uid,
			...params
		})
	}
	async createCaptcha(){
		return await uniCaptcha.create(params)
	}
	async refreshCaptcha(){
		return await uniCaptcha.refresh(params)
	}
*/
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