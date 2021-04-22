<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :where="where" orderby="update_date desc" collection="opendb-news-favorite">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item v-for="(item, index) in data" :key="index" :clickable="true" @click="handleItemClick(item)">
            <view slot="body">
              <text>{{item.article_title || item.article_id}}</text>
			  <uni-dateformat class="article-date" :date="item.update_date" format="yyyy-MM-dd hh:mm"
			  	:threshold="[0, 0]" />
            </view>
          </uni-list-item>
        </uni-list>
      </view>
      <uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
    </unicloud-db>
  </view>
</template>

<script>
	import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: '',
        }
      }
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.udb.loadMore()
    },
	computed:{
		...mapGetters({
			userInfo:'user/info'
		}),
		where(){
			return `user_id == '${this.userInfo._id}'`
		}
	},
    methods: {
      handleItemClick(item) {
        uni.navigateTo({
          url: '/pages/list/detail?id='+item.article_id+'&title='+(item.article_title || '')
        })
      }
    }
  }
</script>

<style>
	.article-date{
		color: #C8C7CC;
	}
</style>
