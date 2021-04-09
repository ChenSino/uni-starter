<template>
	<view class="wrap">
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">登陆后即可展示自己</text>
				<login-ikonw class="login-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>
				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<uni-forms ref="form" :value="formData" :rules="rules">
					<uni-forms-item name="phone">
						<uni-easyinput type="number" class="phone-input-box" :inputBorder="false"
							v-model="formData.phone" maxlength="11" placeholder="请输入手机号">
							<template slot="left">
								<!-- 当前仅支持中国大陆手机号 -->
								<!-- <picker mode="selector" :range="phoneArea" @change="selectPhoneArea"> -->
									<text class="phone-area" @click="selectPhoneArea">{{currenPhoneArea}}</text>
								<!-- </picker> -->
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<button class="send-btn-box" :disabled="!canGetShortMsg" :type="canGetShortMsg?'primary':'default'"
						@click="sendShortMsg">获取短信验证码</button>
				</uni-forms>

				<!-- tip -->
				<text class="tip-text">未注册的手机号验证通过后将自动注册</text>

				<!-- 其他登录方式 -->
				<view class="auth-box">
					<text class="login-text" hover-class="hover" @click="toPwdLogin">密码登录</text>
					<!-- <text class="login-text" hover-class="hover" @click="openLoginList">其他登录方式</text> -->
				</view>
			</view>
		</view>
		<!-- 登录按钮弹窗 -->
		<login-action-sheet ref="loginActionSheet"></login-action-sheet>
		<uni-quick-login ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	import mixin from '../../common/loginPage.mixin.js';
	var currentPage;
	export default {
		mixins:[mixin],
		data() {
			return {
				link: [{
					text: '用户协议',
					to: '/pages/ucenter/agree-list/service/service'
				}, {
					text: '隐私政策',
					to: '/pages/ucenter/agree-list/privacy/privacy'
				}],
				phoneArea: ['+86'],
				currenPhoneArea: '+86',

				formData: {
					phone: '17777777777'
				},
				rules: {
					// 对phone字段进行必填验证
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								pattern: /^1\d{10}$/,
								errorMessage: '手机号格式不正确',
							}
						]
					}
				}
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			let pages = getCurrentPages();
			currentPage = pages[pages.length - 1];
			currentPage.$getAppWebview().setStyle({
				top:"1000px"
			})
			//#endif
		},
		onReady() {
			this.$refs.uniQuickLogin.login('univerify')
			//#ifdef APP-PLUS
			setTimeout(() => {
				currentPage.$getAppWebview().setStyle({
					top:"0"
				})
			}, 1500);
			//#endif
		},
		
		computed: {
			canGetShortMsg() {
				let reg = /^1\d{10}$/;
				return reg.test(this.formData.phone);
			}
		},
		methods: {
			// 触发提交表单
			submit() {
				this.$refs.form.submit().then(res => {
					console.log('表单数据信息：', res);
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			selectPhoneArea(event) {
				uni.showToast({
					title: '当前仅支持中国大陆手机号',
					icon: 'none'
				});
				// this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
			sendShortMsg() {
				if (!this.canGetShortMsg) return;
				/**
				 * 发送验证吗
				 */
				uni.showLoading();
				uni.navigateTo({
					url: './phone-code?phoneNumber=' + this.formData.phone + '&phoneArea=' +
						this.currenPhoneArea,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			/**
			 * 去密码登录页
			 */
			toPwdLogin() {
				uni.navigateTo({
					url: './pwd-login'
				})
			},
			openLoginList() {
				this.$refs.loginActionSheet.open();
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");

	.content-top-title {
		text-align: center;
	}

	.login-iknow {
		justify-content: center;
	}

	.phone-area {
		/* #ifdef APP-NVUE */
		border-right-width: 1rpx;
		border-right-color: #d7d9d8;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-right: 1rpx solid #d7d9d8;
		/* #endif */
	}
</style>
