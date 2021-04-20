'use strict';
let uniID = require('uni-id')
const uniCaptcha = require('uni-captcha')
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	/**
	 * UNI_WYQ:这里的uniID换成新的，保证多人访问不会冲突
	 */
	uniID = uniID.createInstance({
		context
	})
	//event为客户端上传的参数
	console.log('event : ' + JSON.stringify(event))
	let params = event.params || {}
	
	//防止黑客恶意破解登陆，连续登陆失败一定次数后，需要用户提供验证码
	const getNeedCaptcha = async () => {
		//当用户最近“2小时内(recordDate)”登陆失败达到2次(recordSize)时。要求用户提交验证码
		const now = Date.now(),
			  recordDate = 120 * 60 * 1000,
			  recordSize = 2;
		const uniIdLogCollection = db.collection('uni-id-log')
		let recentRecord = await uniIdLogCollection.where({
				deviceId: params.deviceId || context.DEVICEID,
				create_date: dbCmd.gt(now - recordDate),
				type: 'login'
			})
			.orderBy('create_date', 'desc')
			.limit(recordSize)
			.get();
		return recentRecord.data.filter(item => item.state === 0).length === recordSize;
	}
	
	//设置某些模块不需要token（也就是登陆成功后）才能操作,如果需要token就获取当前操作账户的uid
	let noCheckAction = [
		'register', 'checkToken','login', 'logout', 'sendSmsCode',
		'createCaptcha', 'verifyCaptcha','refreshCaptcha', 'inviteLogin',
		'login_by_weixin','login_by_univerify','login_by_apple','loginBySms'
	]
	let payload;
	console.log(event.action);
	if (!noCheckAction.includes(event.action)) {
		if (!event.uniIdToken) {
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}
	
	
	//记录成功登陆的日志
	const loginLog = async (res = {}, type = 'login') => {
		const now = Date.now()
		const uniIdLogCollection = db.collection('uni-id-log')
		let logData = {
			deviceId: params.deviceId || context.DEVICEID,
			ip: params.ip || context.CLIENTIP,
			type,
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
	
		return uniIdLogCollection.add(logData)
	}



	let res = {}
	switch (event.action) {
		case 'register':
			res = await uniID.register(params);
			break;
		case 'login':
			let passed = false;
			let needCaptcha = await getNeedCaptcha();
			
			if (needCaptcha) {
				res = await uniCaptcha.verify(params)
				if (res.code === 0) passed = true;
			}
			
			if (!needCaptcha || passed) {
				res = await uniID.login({
					...params,
					queryField: ['username', 'email', 'mobile']
				});
				await loginLog(res);
				needCaptcha = await getNeedCaptcha();
			}
			
			res.needCaptcha = needCaptcha;
			break;
		case 'login_by_weixin':
			res = await uniID.loginByWeixin(params);
			await uniID.updateUser({
				uid: params.uid,
				username:"微信用户"
			});
			res.userInfo.username = "微信用户"
			loginLog(res)
			break;
		case 'login_by_univerify':
			res = await uniID.loginByUniverify(params)
			break;
		case 'login_by_apple':
			res = await uniID.loginByApple(params)
			loginLog(res)
			break;
		case 'checkToken':
			res = await uniID.checkToken(event.uniIdToken);
			break;
		case 'logout':
			res = await uniID.logout(event.uniIdToken)
			break;
		case 'sendSmsCode':
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
			res = await uniID.sendSmsCode({
				mobile: params.mobile,
				code,
				type: params.type,
				templateId
			})
			break;
		case 'loginBySms':
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
			break;
		case 'inviteLogin':
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
			break;
		case 'getInviteCode':
			res = await uniID.getUserInfo({
				uid: params.uid,
				field: ['my_invite_code']
			})
			if (res.code === 0) {
				res.myInviteCode = res.userInfo.my_invite_code
				delete res.userInfo
			}
			break;
		case 'getInvitedUser':
			res = await uniID.getInvitedUser(params)
			break;
		case 'updatePwd':
			res = await uniID.updatePwd({
				uid: params.uid,
				...params
			})
			break;
		case 'createCaptcha':
			res = await uniCaptcha.create(params)
			break;
		case 'refreshCaptcha':
			res = await uniCaptcha.refresh(params)
			break;
		case 'resetPwd':
			res = await uniID.resetPwd({...params,"uid":payload.uid})
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}

	//返回数据给客户端
	return res
};
