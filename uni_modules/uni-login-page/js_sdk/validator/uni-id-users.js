// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"gender": {
		"rules": [{
				"format": "int"
			},
			{
				"range": [{
						"text": "未知",
						"value": 0
					},
					{
						"text": "男",
						"value": 1
					},
					{
						"text": "女",
						"value": 2
					}
				]
			}
		],
		"defaultValue": 0,
		"label": "性别"
	},
	"username": {
		"rules": [{

				required: true,
				errorMessage: '请输入用户名',

			},
			{
				minLength: 3,
				maxLength: 10,
				errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		"label": "用户名"
	},
	"nickname": {
		"rules": [{

				required: true,
				errorMessage: '请输入昵称',

			},
			{
				minLength: 3,
				maxLength: 10,
				errorMessage: '昵称长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		"label": "昵称"
	},
	"pwd":{
		"rules": [{
		
				required: true,
				errorMessage: '请输入密码',
		
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		"label": "密码"
	},
	"pwd2":{
		"rules": [{
		
				required: true,
				errorMessage: '再次输入密码',
		
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		"label": "确认密码"
	}
}

const enumConverter = {
	"gender_valuetotext": {
		"0": "未知",
		"1": "男",
		"2": "女"
	}
}

export {
	validator,
	enumConverter
}
