console.log('----vue.config.js----', process.env.UNI_CLOUD_PROVIDER)
process.env.UNI_CLOUD_PROVIDER = JSON.stringify([{
	"provider": "aliyun", //阿里云
	"clientSecret": "",
	"spaceId": ""
}])
module.exports = {}