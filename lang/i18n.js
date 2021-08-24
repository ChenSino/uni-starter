import langEn from './en'
import langZhCN from './zh-CN'
const messages = {
	'en': langEn,
	'zh-CN': langZhCN
}
let currentLang = uni.getStorageSync('CURRENT_LANG')
if (!currentLang) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('CURRENT_LANG', res.language)
			currentLang = res.language
		}
	})
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