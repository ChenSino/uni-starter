<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			collection="opendb-feedback"
			field="user_id,create_date,content,imgs,is_reply,feedback_id,contact,mobile,reply_count" :where="queryWhere"
			:getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">
				
				<uni-forms-item name="content" label="反馈内容">
					<uni-easyinput :disabled="true" placeholder="请输入反馈内容" type="textarea" v-model="data.content" trim="right" />
				</uni-forms-item>
				<uni-forms-item v-if="data.imgs.length>0" name="imgs" label="反馈截图">
					<feedback-imgs :imgs="data.imgs"></feedback-imgs>
				</uni-forms-item>
				<uni-forms-item name="contact" label="联系人">
					<uni-easyinput :disabled="true" placeholder="请输入联系人" v-model="data.contact" trim="both" />
				</uni-forms-item>
				<uni-forms-item name="mobile" label="联系方式">
					<uni-easyinput :disabled="true" placeholder="请输入手机号/邮箱" v-model="data.mobile" trim="both" />
				</uni-forms-item>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	// 由schema2code生成，包含校验规则和enum静态数据
	import {
		enumConverter
	} from '../../js_sdk/validator/opendb-feedback.js';
	import feedbackImgs from '../../components/feedback-imgs';

	export default {
		components:{feedbackImgs},
		data() {
			return {
				queryWhere: '',
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: {
					// 将scheme enum 属性静态数据中的value转成text
					...enumConverter
				}
			}
		},
		onLoad(e) {
			this._id = e.id
		},
		onReady() {
			if (this._id) {
				this.queryWhere = '_id=="' + this._id + '"'
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}

	.btns {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
	}

	.btns button {
		flex: 1;
	}

	.btn-delete {
		margin-left: 10px;
	}
</style>
