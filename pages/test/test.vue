<template>
	<view>
		test
		<button type="default" @click="fn1">1</button>
		<button type="default" @click="fn2">2</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			fn1(){
				let res = this.request('user-center/login_by_').then(e=>{
					console.log('then--1',e);
				})
			},
			fn2(){
				this.request('user-center/login_by_',{},e=>{
					console.log('222',e);
				})
			}
		}
	}
</script>

<style>

</style>
