<template>
	<view class="short-code-btn" hover-class="hover" @click="start">
		<text class="inner-text" :class="reverseNumber==0?'inner-text-active':''">{{innerText}}</text>
	</view>
</template>

<script>
	function debounce(func, wait) {
		let timer;
		wait = wait || 500;
		return function() {
			let context = this;
			let args = arguments;
			if (timer) clearTimeout(timer);
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait)
			if (callNow) func.apply(context, args);
		}
	}
	export default {
		name: "login-short-code",
		props: {
			/**
			 * 倒计时时长 s
			 */
			count: {
				type: [String, Number],
				default: 60
			},
			/**
			 * 手机号码
			 */
			phone: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				reverseNumber: 0,
				reverseTimer: null
			};
		},
		computed: {
			innerText() {
				if (this.reverseNumber == 0) return '获取验证码';
				return '重新发送('+this.reverseNumber+'s)';
			}
		},
		created() {
			this.initClick();
		},
		methods: {
			initClick() {
				this.start = debounce(() => {
					if (this.reverseNumber != 0) return;
					this.sendMsg();
				})
			},
			sendMsg() {
				let reg_phone = /^1\d{10}$/;
				if(!reg_phone.test(this.phone))return uni.showToast({
					title: '手机号格式错误',
					icon: 'none'
				});
				
				this.request('user-center/sendSmsCode',
					{
						"mobile": this.phone,
						"type": "login"
					},(data,result)=>{
						console.log(data,result);
						uni.showToast({
							title: "短信验证码发送成功",
							icon: 'none'
						});
						this.reverseNumber = Number(this.count);
						this.getCode();
						this.$emit('getCode');
					})
				
				// uniCloud.callFunction({
				// 	"name": "user-center",
				// 	"data": {
				// 		"action": "sendSmsCode",
				// 		"params": {
				// 			"mobile": this.phone,
				// 			"type": "login"
				// 		}
				// 	},
				// 	success: (e) => {
				// 		uni.showToast({
				// 			title: "短信验证码发送成功",
				// 			icon: 'none'
				// 		});
				// 		this.reverseNumber = Number(this.count);
				// 		this.getCode();
				// 		this.$emit('getCode');
				// 	},
				// 	fail: (err) => {
				// 		console.log(err);
				// 		uni.showToast({
				// 			title: '短信验证码发送失败',
				// 			icon: 'none'
				// 		});
				// 	},
				// 	complete: () => {
				// 		uni.hideLoading()
				// 	}
				// })
			},
			getCode() {
				if (this.reverseNumber == 0) {
					clearTimeout(this.reverseTimer);
					this.reverseTimer = null;
					return;
				}
				this.reverseNumber--;
				this.reverseTimer = setTimeout(() => {
					this.getCode();
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.short-code-btn {
		width: 200rpx;
		height: 85rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
	.inner-text {
		font-size: 28rpx;
		color: #AAAAAA;
	}
	.inner-text-active {
		color: #007aff;
	}
</style>
