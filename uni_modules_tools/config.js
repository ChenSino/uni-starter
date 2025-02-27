// "文件路径" : {"键名":"改成什么"}
{
	"/manifest.json": {
		"appid": "",
		"name": "",
		"versionName": "",
		"mp-weixin": {
			"appid": ""
		},
		"vueVersion": "2",
		"app-plus": {
			"modules": {
				"OAuth": {}
			},
			"distribute": {
				"sdkConfigs": {
					"oauth": {
						"univerify": {},
						"weixin": {
							"appid": "",
							"appsecret": "",
							"UniversalLinks": ""
						},
						"apple": {}
					}
				}
			}
		}
	},
	"/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json": {
		"tokenExpiresIn": 7200,
		"app": {
			"oauth": {
				"weixin": {
					"appid": "填写来源微信开放平台https://open.weixin.qq.com/创建的应用的appid",
					"appsecret": "填写来源微信开放平台https://open.weixin.qq.com/创建的应用的appsecret"
				},
				"apple": {
					"bundleId": "苹果开发者后台获取的bundleId"
				}
			}
		},
		"web": {
		  "oauth": {
		    "weixin-h5": {
		      "appid": "微信浏览器内微信登录，所用的微信公众号appid",
		      "appsecret": "微信公众号后台获取的appsecret"
		    },
		    "weixin-web": {
		      "appid": "手机微信扫码登录，所用的微信开放平台（https://open.weixin.qq.com/）-网站应用的appid",
		      "appsecret": "微信开放平台-网站应用的appsecret"
		    }
		  }
		},
		"mp-weixin": {
			"oauth": {
				"weixin": {
					"appid": "微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取",
					"appsecret": "微信小程序后台获取的appsecret"
				}
			}
		},
		"mp-alipay": {
			"oauth": {
				"alipay": {
					"appid": "支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr",
					"privateKey": "支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr"
				}
			}
		},
		"service": {
			"sms": {
				"name": "应用名称，对应短信模版的name",
				"smsKey": "短信密钥key，开通短信服务处可以看到",
				"smsSecret": "短信密钥secret，开通短信服务处可以看到"
			},
			"univerify": {
				"appid": "当前应用的appid，使用云函数URL化，此项必须配置",
				"apiKey": "apiKey 和 apiSecret 在开发者中心获取，开发者中心：https://dev.dcloud.net.cn/uniLogin/index?type=0，文档：https://ask.dcloud.net.cn/article/37965",
				"apiSecret": ""
			}
		}
	}
}
