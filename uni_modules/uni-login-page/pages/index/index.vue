<template>
	<view class="wrap" v-show="isShow">
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
								<picker mode="selector" :range="phoneArea" @change="selectPhoneArea">
									<text class="phone-area">{{currenPhoneArea}}</text>
								</picker>
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
					<text class="login-text" hover-class="hover" @click="openLoginList">其他登录方式</text>
				</view>
			</view>
		</view>
		<!-- 登录按钮弹窗 -->
		<login-action-sheet ref="loginActionSheet"></login-action-sheet>
		<uni-quick-login></uni-quick-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				link: [{
					text: '用户协议',
					to: '/baidu.com'
				}, {
					text: '隐私政策',
					to: 'baidu'
				}],
				phoneArea: ['+86', '+87'],
				currenPhoneArea: '+86',
				phoneNumber: '',

				formData: {
					phone: ''
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
		onReady() {
			setTimeout(() => {
				this.isShow = true
			}, 1500);
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
				this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
			sendShortMsg() {
				if (!this.canGetShortMsg) return;
				/**
				 * 发送验证吗
				 */
				// 发送成功后跳转页面
				uni.navigateTo({
					url:'./phone-code?phoneNumber='+this.formData.phone+'&phoneArea='+this.currenPhoneArea
				})
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
