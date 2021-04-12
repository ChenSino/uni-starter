<template>
	<view>
		test
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.request('user-center/login_by_',{},e=>{
				console.log(e);
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
