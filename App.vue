<script>
	import initApp from '@/common/appInit.js';
	import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
			$i18n: {},
			$t: {}
		},
		setup() {
		},
		onLaunch: function() {
			console.log('App Launch')
			
			
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)

			initApp();
			// #ifdef APP-PLUS
			//checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
			// #endif

			// #ifdef H5
			// checkIsAgree(); // 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要
			// #endif

			// #ifdef APP-PLUS
			//idfa有需要的用户在应用首次启动时自己获取存储到storage中
			//https://ask.dcloud.net.cn/article/36107
			/*if(~plus.storage.getItem('idfa')){
				plus.device.getInfo({//需要勾选IDFA
					success:function(e){  
						console.log('idfa =  '+JSON.stringify(e.idfa));  
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));  
					}  
				});
			}*/
			// #endif

			let initLanguageAfter = () => {
				console.log(this.$t('tabbar'));
				//底部tabbar更新
				this.$t('tabbar').split(',').forEach((text, index) => {
					uni.setTabBarItem({
						index,
						text,
						complete: e => {
							// console.log("e: " + JSON.stringify(e));
						}
					})
				})
				//更新 uni-starter.config
					//agreements
					let agreements = [{
							"title": "用户服务协议", //协议名称
							"url": "请填写用户服务协议链接" //对应的网络链接
						},
						{
							"title": "隐私政策",
							"url": "请填写隐私政策链接"
						}
					]
					if(getApp().$i18n.locale == 'en'){
						agreements = [{
								"title": "User service agreement", //协议名称
								"url": "请填写用户服务协议链接" //对应的网络链接
							},
							{
								"title": "Privacy policy",
								"url": "请填写隐私政策链接"
							}
						]
					}
					console.log(getApp().globalData.config)
					getApp().globalData.config.about.agreements = agreements
			}
			setTimeout(()=>{
				initLanguageAfter()
			},1000)
			uni.$on('changeLanguage', e => {
				console.log('changeLanguage',e);
				initLanguageAfter(e)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
