<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2717
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 unicloud-db 组件文档：https://uniapp.dcloud.net.cn/uniCloud/unicloud-db-component
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view class="article">
		<unicloud-db v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection" :field="field"
		 :getone="true" :where="where" :manual="true" ref="detail" @load="loadData">
			<template v-if="!loading && data">
				<view class="article-title">{{title}}</view>
				<uni-list :border="false">
					<uni-list-item thumbSize="lg" :thumb="data.image">
						<!-- 通过body插槽定义作者信息内容 -->
						<view slot="body" class="header-content">
							<view class="uni-title">{{data.author && data.author[0].username}}</view>
							<view class="uni-note">更新于 {{data.last_modify_date | beforTime}} </view>
						</view>
						<view slot="footer" class="footer">
							<button @click="followClick" class="footer-button">关注</button>
						</view>
					</uni-list-item>
				</uni-list>
				<view class="banner">
					<!-- 文章开头，缩略图 -->
					<image class="banner-img" :src="data.avatar" mode="widthFix"></image>
					<!-- 文章摘要 -->
					<view class="banner-title">
						<text class="uni-ellipsis">{{data.excerpt}}</text>
					</view>
				</view>
				<!-- 新闻详情：使用 uParse 解析富文本 -->
				<view class="article-content">
					<u-parse :content="data.content" :noData="options.noData"></u-parse>
				</view>
			</template>
		</unicloud-db>
		<uni-popup ref="sharePopup" type="bottom">
			<uni-popup-share @select="selectShareItem"></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/parse.vue';
	import { friendlyDate } from '@/common/utils.js';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				// 当前显示 _id
				id:"",
				title:'',
				// 数据表名
				collection: 'opendb-news-articles,uni-id-users',
				// 查询字段，多个字段用 , 分割
				field: 'author{username, _id},_id,avatar,excerpt,last_modify_date, comment_count, like_count,title,content',
				formData: {
					noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
				}, 
			}
		},filters:{
			beforTime(number){
				if(number)return friendlyDate(+number);
				return '';
			}
		},
		computed:{
			//拼接where条件
			//查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=jsquery
			where(){
				return `_id =="${this.id}"`
			}
		},
		onLoad(event) {
			//获取真实新闻id，通常 id 来自上一个页面
			if(event.id){
				this.id = event.id
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if(event.title){
				this.title = event.title
				uni.setNavigationBarTitle({
					title:event.title
				})
			}
		},
		onNavigationBarButtonTap(event) {
			if(event.type == 'share'){
				this.shareClick();
			}
		},
		onReady() {
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if(this.id){// ID 不为空，则发起查询
				this.$refs.detail.loadData()
			}else{
				uni.showToast({
					icon:'none',
					title:'出错了，新闻ID为空'
				})
			}
		},
		methods: {
			loadData(data){
				//如果上一页未传递标题过来（如搜索直达详情），则从新闻详情中读取标题
				if(this.title == '' && data[0].title){
					this.title = data[0].title
					uni.setNavigationBarTitle({
						title:data[0].title
					})
				}
			},
			/**
			 * followClick
			 * 点击关注
			 */
			followClick(){
				uni.showToast({
					title: '点击关注',
					icon: 'none'
				});
			},
			/**
			 * 分享该文章
			 */
			shareClick(){
				//#ifdef APP-PLUS
				this.$refs.sharePopup.open();
				//#endif
				//#ifndef APP-PLUS || H5
				uni.setClipboardData({
				    data: 'http://uniapp.dcloud.io/',
				    success: function () {
				        uni.showToast({
				        	title: '已复制到剪切板',
				        	icon: 'none'
				        });
				    }
				});
				//#endif
				// #ifdef H5
				let value = 'http://uniapp.dcloud.io/';
				const textarea = document.createElement('textarea');
				textarea.value = value;
				textarea.readOnly = true;
				document.body.appendChild(textarea);
				textarea.select();
				textarea.setSelectionRange(0, value.length);
				document.execCommand('copy');
				textarea.remove();
				uni.showToast({
					title: '已复制到剪切板',
					icon: 'none'
				});
				// #endif
			},
			selectShareItem({item, index}, done){
				
				//#ifdef APP-PLUS
				if(item.name == 'more'){
					// "其他"选项
					uni.setClipboardData({
					    data: 'http://uniapp.dcloud.io/',
					    success: function () {
					        uni.showToast({
					        	title: '已复制到剪切板',
					        	icon: 'none'
					        });
					    }
					});
				} else {
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "http://uniapp.dcloud.io/",
					    title: "uni-app分享",
					    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					    imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
				//#endif
				//#ifndef APP-PLUS
				uni.showToast({
					title: '仅app端支持分享',
					icon: 'none'
				});
				//#endif
				done();
			}
		}
	}
</script>

<style scoped>
	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	/* 标题 */
	.uni-title {
		display: flex;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #3b4144;
	}

	/* 描述 额外文本 */
	.uni-note {
		color: #999;
		font-size: 12px;
	}

	.footer {
		display: flex;
		align-items: center;
	}

	.footer-button {
		display: flex;
		align-items: center;
		font-size: 12px;
		height: 30px;
		color: #fff;
		background-color: #ff5a5f;
	}

	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
	}

	.banner-title {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 0 15px;
		width: 100%;
		bottom: 0;
		height: 30px;
		font-size: 14px;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		box-sizing: border-box;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>
