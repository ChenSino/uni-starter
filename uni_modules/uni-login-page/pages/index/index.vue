<template>
	<view class="wrap" v-show="isShow">
		<uni-nav-bar @clickLeft="back" left-icon="back" right-text="帮助" :statusBar="true" :border="false"></uni-nav-bar>
		<view class="wrap-content">
			<view class="content">
				<!-- 顶部文字 -->
				<text class="content-top-title">登陆后即可展示自己</text>
				<login-ikonw class="login-iknow" :link="link" text="登录即表示同意用户协议和隐私政策"></login-ikonw>

				<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
				<view class="phone-input-box">
					<picker mode="selector" :range="phoneArea" @change="selectPhoneArea">
						<text class="phone-area">{{currenPhoneArea}}</text>
					</picker>
					<input type="number" class="phone-input" maxlength="11" placeholder="请输入手机号"
						v-model="phoneNumber" />
				</view>

				<!-- tip -->
				<text class="tip-text">未注册的手机号验证通过后蒋自动注册</text>

				<!-- 发送按钮 -->
				<view class="send-btn-box" hover-class="hover"
					@click="sendShortMsg" :class="canGetShortMsg?'send-btn-active':''">
					<text class="send-btn-text">获取短信验证码</text>
				</view>

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
				isShow:false,
				link: [{
					text: '用户协议',
					to: '/baidu.com'
				}, {
					text: '隐私政策',
					to: 'baidu'
				}],
				phoneArea: ['+86', '+87'],
				currenPhoneArea: '+86',
				phoneNumber: ''
			}
		},
		onReady() {
			setTimeout(()=>{
				this.isShow = true
			},1500);
		},
		computed: {
			canGetShortMsg() {
				let reg = /^1\d{10}$/;
				return reg.test(this.phoneNumber);
			}
		},
		methods: {
			selectPhoneArea(event) {
				this.currenPhoneArea = this.phoneArea[event.detail.value];
			},
			sendShortMsg() {
				if (!this.canGetShortMsg) return;
				/**
				 * 发送验证吗
				 */
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
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	@import url("../../common/loginPage.css");
	.content-top-title{
		text-align: center;
	}
	
	.login-iknow{
		justify-content: center;
	}
</style>