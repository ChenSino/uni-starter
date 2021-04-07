<template>
	<view class="flex flex-row flex-wrap">
		<text class="text-sub font-26" v-for="(t, i) in innerText" :key="i" :class="t.to?'link-color':''"
			@click="clickLink(t)">{{t.text || t}}</text>
	</view>
</template>

<script>
	/**
	 * text 政策描述文字
	 * link 高亮关键字及其链接
	 */
	export default {
		name: "login-ikonw",
		props: {
			text: {
				type: String,
				default: ''
			},
			link: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {

			};
		},
		computed: {
			innerText() {
				if (this.link.length == 0) return this.text;
				let textList = String(this.text);
				this.link.forEach(item => {
					textList = textList.replace(item.text, '$');
				});
				textList = textList.split('');
				let list = [],
					linkList = JSON.parse(JSON.stringify(this.link));
				textList.forEach((text, tIndex) => {
					if (text == '$') {
						let currLink = linkList.shift();
						currLink.text.split('').forEach(item => {
							list.push({
								text: item,
								to: currLink.to
							});
						})
					} else {
						list.push({
							text
						})
					}
				});
				return list;
			}
		},
		methods: {
			/**
			 * 点击跳转到协议页面
			 * @param {Object} link
			 */
			clickLink(link) {
				uni.navigateTo({
					url: link.to
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/myStyle.css");

	.link-color {
		color: #04498c;
	}
</style>
