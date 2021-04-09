<template>
	<view>
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<text class="content">{{ item.content }}</text>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accordion: [{
						id: 0,
						title: '什么是uniCloud？',
						content: `uniCloud 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台。`,
						animation: true
					},
					{
						id: 1,
						title: '什么是serverless？',
						content: `serverless是目前很火的概念，它是下一代云技术，是真正的“云”。
传统的云服务，让开发者免于购买实体服务器硬件，改为购买虚拟机。但开发者仍然要自己装操作系统、web服务器、数据库，自己处理热备，自己新购服务器来应对高并发，自己抗DDOS攻击...`,
						animation: true
					},
					{
						id: 2,
						title: 'uniCloud为何可降低云服务租用成本',
						content: `1、传统云服务的租用，按占用的硬件资源的上限值+固定时长来租用。
选择CPU和内存的配置，不到满配时，资源是浪费的，接近满配就需要立即扩容新的配置。
serverless不是传统云，它不需要开发者选择CPU和内存配置，也没有操作系统的选择。开发者编写云函数代码，上传到uniCloud的阿里云版或腾讯云版。
阿里云和腾讯云搭建了巨大的serverless资源池，有众多node进程用于云函数的运行。
这些资源是复用和共享的，并不存在某个开发者租用了3G CPU和8G内存，这些硬件就只能为他所用。
因为共享大资源池，云服务厂商的成本大幅下降，开发者无需为闲置资源付费，云函数被调用才计费。
从技术原理上serverless就有明显成本优势，所以租用serverless比租用传统云要便宜的多。
2、没有名目繁多的收费项
在传统云的世界里，有大量的收费产品。
在阿里云和腾讯云的官网可以看到长长的收费产品列表，比如负载均衡、高防、安全中心...
在uniCloud的世界，简单清晰，没有这些收费项。
只需按对计算资源、存储资源的消耗计费，只需关心业务，无需关心其他各种名目的增值产品，也无需为它们付费。
要知道一个用于防DDoS的高防套餐，每个月至少几万元。而这些费用，在uniCloud中无需支付。
展开说下uniCloud为什么不用买高防也不害怕DDoS：由于阿里云和腾讯云的serverless有巨大的资源池，且serverless没有固定ip，云函数使用的是阿里云和腾讯云的自有域名，前端网页托管在cdn上，DDoS攻击者打不起、也打不挂uniCloud。
3、云厂商的促销补贴
目前阿里云为uniCloud提供了纯免费的云资源，不但云函数、云数据库免费，连存储和cdn都免费。
腾讯云也提供了一个免费服务空间，此外再建服务空间的收费也比传统云要低很多。
基于以上3点原因，uniCloud大幅降低了开发者云资源的租用成本。
除了云资源的成本，uniCloud还可以减少开发商的人工成本、招聘成本、沟通管理成本，这些成本往往远大于云资源成本。`,
						animation: true
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
		font-size: 14px;
		line-height: 20px;
		background-color: #f9f9f9;
		color: #666;
	}

	.button {
		font-size: 26rpx;
		line-height: 90rpx;
	}
</style>