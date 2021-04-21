import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import openApp from './common/openApp.js';
import request from './js_sdk/request.js';

Vue.config.productionTip = false
Vue.prototype.request = request
openApp();
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
