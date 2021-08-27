import langEn from './en'
import zhHans from './zh-Hans'
const messages = {
	'en': langEn,
	'zh-Hans': zhHans
}
let currentLang = uni.getStorageSync('CURRENT_LANG')
if (!currentLang) {
	if(uni.getLocale){
		console.log('获取应用语言:',uni.getLocale() );
		let language = 'zh-Hans' 
		if(uni.getLocale() != 'zh-Hans'){
			language = 'en'
		}
		uni.setStorageSync('CURRENT_LANG', language)
		currentLang = language
	}else{
		uni.getSystemInfo({
			success: function (res) {
				uni.getSystemInfo({
					success: function (res) {
						console.log('获取设备信息:',res);
						let language = 'zh-Hans' 
						if(res.language != 'zh-Hans'){
							language = 'en'
						}
						uni.setStorageSync('CURRENT_LANG', language)
						currentLang = language
					},
					fail: (err) => {
						console.error(err)
					}
				})
			},
			fail: (err) => {
				console.error(err)
			}
		})
	}
}
let i18nConfig = {
	locale: currentLang, // set locale
	messages // set locale messages
}

// #ifdef VUE2
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
// #endif

// #ifdef VUE3
import {createI18n} from 'vue-i18n'
const i18n = createI18n(i18nConfig)
// #endif

export default i18n