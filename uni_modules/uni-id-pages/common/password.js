// 导入配置
import config from '@/uni_modules/uni-id-pages/config.js'

const passwordLength = config.password.length
const passwordStrength = config.password.strength

let minPasswordLength = 6
let maxPasswordLength = 20
if (passwordLength) {
	if (passwordLength[0]) {
		minPasswordLength = passwordLength[0]
	}
	if (passwordLength[1]) {
		maxPasswordLength = passwordLength[1]
	}
}
// 密码强度表达式
const passwordRules = {
	// 密码必须包含大小写字母、数字和特殊符号
	super: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// 密码必须包含字母、数字和特殊符号
	strong: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// 密码必须为字母、数字和特殊符号任意两种的组合
	medium: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// 密码必须包含字母和数字
	weak: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,16}$/
}

const ERROR = {
	normal: {
		noPwd: '请输入密码',
		noRePwd: '再次输入密码',
		rePwdErr: '两次输入密码不一致'
	},
	passwordStrengthError: {
		superstrong: '密码必须包含大小写字母、数字和特殊符号',
		strong: '密码必须包含字母、数字和特殊符号',
		medium: '密码必须为字母、数字和特殊符号任意两种的组合',
		weak: '密码必须包含字母'
	},
	passwordLengthError: {
		normal: '密码长度必须在' + minPasswordLength + '-' + maxPasswordLength + '位之间',
		minLimit: '密码长度不得少于' + minPasswordLength + '位',
		maxLimit: '密码长度不得超过' + maxPasswordLength + '位'
	}
}

function validPwd(password) {
	//强度校验
	if (passwordStrength && passwordRules[passwordStrength]) {
		if (!new RegExp(passwordRules[passwordStrength]).test(password)) {
			return ERROR.passwordStrengthError[passwordStrength]
		}
	}
	//长度校验
	if (passwordLength) {
		if (passwordLength[0] && password.length < passwordLength[0]) {
			return ERROR.passwordLengthError.minLimit
		}
		if (passwordLength[1] && password.length > passwordLength[1]) {
			return ERROR.passwordLengthError.maxLimit
		}
	}

	return true
}

function getPwdRules(pwdName = 'password', rePwdName = 'password2') {
	const rules = {}
	rules[pwdName] = {
		rules: [{
				required: true,
				errorMessage: ERROR.normal.noPwd,
			},
			{
				validateFunction: function(rule, value, data, callback) {
					const checkRes = validPwd(value)
					if (checkRes !== true) {
						callback(checkRes)
					}
					return true
				}
			}
		]
	}

	if (rePwdName) {
		rules[rePwdName] = {
			rules: [{
					required: true,
					errorMessage: ERROR.normal.noRePwd,
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if (value != data.password) {
							callback(ERROR.normal.rePwdErr)
						}
						return true
					}
				}
			]
		}
	}
	return rules
}

export default {
	ERROR,
	minPasswordLength,
	maxPasswordLength,
	validPwd,
	getPwdRules
}
