const {
  getWeixinPlatform
} = require('../../lib/utils/weixin')
const {
  getNonceStr
} = require('../../common/utils')
const {
  createHash
} = require('crypto')

/**
 * 获取微信公众号config参数
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#get-h5-weixin-config
 * @param {object} params
 * @param {string} params.url  当前页面url不带hash部分
 * @returns
 */
module.exports = async function (params) {
  const schema = {
    url: 'string'
  }
  this.middleware.validate(params, schema)
  const {
    url
  } = params
  const oauthConfig = this.configUtils.getOauthConfig({
    provider: 'weixin'
  })
  const {
    appId
  } = this.getClientInfo()
  const weixinPlatform = getWeixinPlatform.call(this)
  const getTicketRes = await this.uniOpenBridge.getTicket({
    dcloudAppid: appId,
    platform: weixinPlatform + '-weixin'
  })
  if (!getTicketRes) {
    throw new Error('Wechat official account ticket not found, please referer to: https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#login-by-weixin-h5')
  }
  const ticket = getTicketRes.ticket
  const signContent = {
    jsapi_ticket: ticket,
    noncestr: getNonceStr(),
    timestamp: Math.floor(Date.now() / 1000),
    url: url.split('#')[0]
  }
  const signStr = Object.keys(signContent).sort().reduce(function (str, key) {
    return str + key + '=' + signContent[key] + '&'
  }, '').replace(/&$/, '')
  const signature = createHash('sha1').update(signStr, 'utf8').digest('hex')
  return {
    errCode: 0,
    appId: oauthConfig.appid, // 公众号的唯一标识
    timestamp: signContent.timestamp, // 生成签名的时间戳
    nonceStr: signContent.noncestr, // 生成签名的随机串
    signature // 签名
  }
}
