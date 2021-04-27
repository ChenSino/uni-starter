<template>
	<view :class="[flex?'flex':'null']">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			flex: {
				default(){
					return false
				}
			},
		},
		data() {
			return {
			}
		},
		watch: {
		},
		methods: {
		},
	}
</script>

<style lang="scss" scoped>
.null{
	display: inline-flex;
	width: auto;
}
.flex{
	display: flex;
}
</style>
