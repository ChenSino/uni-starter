<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>
<script>
	export default {
		created() {
			document.getElementById("openApp").style.display = 'none'
			document.getElementsByTagName("body")[0].style = ""
		},
		onLoad({
			code
		}) {
			this.code = code
		},
		onReady() {
			var IframeOnClick = {
			    resolution: 200,  
			    iframes: [],  
			    interval: null,  
			    Iframe: function() {  
			        this.element = arguments[0];  
			        this.cb = arguments[1];   
			        this.hasTracked = false;  
			    },  
			    track: function(element, cb) {  
			        this.iframes.push(new this.Iframe(element, cb));  
			        if (!this.interval) {  
			            var _this = this;  
			            this.interval = setInterval(function() { _this.checkClick(); }, this.resolution);  
			        }  
			    },  
			    checkClick: function() {  
			        if (document.activeElement) {  
			            var activeElement = document.activeElement;  
			            for (var i in this.iframes) {  
			                if (activeElement === this.iframes[i].element) { // user is in this Iframe  
			                    if (this.iframes[i].hasTracked == false) {   
			                        this.iframes[i].cb.apply(window, []);   
			                        this.iframes[i].hasTracked = true;  
			                    }  
			                } else {  
			                    this.iframes[i].hasTracked = false;  
			                }  
			            }  
			        }  
			    }  
			};  
			IframeOnClick.track(document.getElementsByTagName("iframe")[0], ()=>{ 
				this.copy()
			}); 
		},
		computed: {
			url() {
				return getApp().globalData.config.about.download
			}
		},
		data() {
			return {
				code: ""
			}
		},
		methods: {
			copy() {
				console.log('copy');
				if(!this.code){
					return false
				}
				uni.setClipboardData({
					data: 'uniInvitationCode:' + this.code,
					success: () => {
						uni.showModal({
							content: '成功在用户剪切板中存储，邀请人code：'+this.code,
							showCancel: false
						});
					},
					fail: () => {
						uni.showModal({
							content: '失败，未能。在用户剪切板中存储，邀请人code',
							showCancel: false
						});
					}
				})
				uni.hideToast()
				
				/* 以下临时解决h5端样式和键盘弹出端错误解决方案，后续会直接内置*/
				document.getElementById("#clipboard").style.top = '-999px';
				uni.hideKeyboard()
			}
		}
	}
</script>
<style>
</style>
