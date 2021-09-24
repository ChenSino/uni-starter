<script>
	import initApp from '@/common/appInit.js';
	import openApp from '@/common/openApp.js';
	import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
			$i18n: {},
			$t: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)

			initApp();
			
			// #ifdef H5
				openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif
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
				console.log('作用于多语言国际化功能，这里获取语言包lang/en.js、lang/zh-Hans.js的tabbar中配置的值更新当前应用的底部tabbar，如果你不需要多语言国际化。直接删除App.vue页面的47-55行即可');
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
				let agreementsTitle = this.$t('agreementsTitle').split(',')
				let agreements = getApp().globalData.config.about.agreements					agreements[0].title = agreementsTitle[0]					agreements[1].title = agreementsTitle[1]				getApp().globalData.config.about.agreements = agreements
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
