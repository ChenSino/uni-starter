<template>
	<view class="short-code-btn" hover-class="hover" @click="clickBtn">
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
				return this.reverseNumber;
			}
		},
		created() {
			this.initClick();
		},
		methods: {
			initClick() {
				this.clickBtn = debounce(() => {
					if (this.reverseNumber != 0) return;
					this.$emit('getCode', () => {
						this.reverseNumber = Number(this.count);
						this.getCode();
					});
				})
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
	.inner-text{
		font-size: 28rpx;
	}
	.inner-text-active{
		color: #007aff;
	}
</style>
