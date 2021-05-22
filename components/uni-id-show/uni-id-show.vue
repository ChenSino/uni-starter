<template>
	<view v-if="pass">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"uni-id-show",
		props: {
			isLogin:{
				type: Boolean,
				default(){
					return false
				}
			},
			role: {
				type: [Array,String],
				default(){
					return "ALL"
				}
			},
			permission: {
				type: [Array,String],
				default(){
					return "ALL"
				}
			}
		},
		data() {
			return {
				pass: true
			}
		},
		created() {
			this.check()
		},
		methods:{
			check(){
				let {permission,role,tokenExpired,uid} = uniCloud.getCurrentUserInfo()
				console.log(permission,role,tokenExpired,uid);
				let pass = true
				//1.是否需要登陆
				if(this.isLogin){
					pass = uid != null
				}
				//2.角色要求
				if(this.role != "ALL"){
					pass = role.some(item => this.role.includes(item));
				}
				//3.权限要求
				if(this.permission != "ALL"){
					pass = permission.some(item => this.permission.includes(item));
				}
				this.pass = pass
			}
		}
	}
</script>