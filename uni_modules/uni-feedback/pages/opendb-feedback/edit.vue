
<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="user_id" label="">
  <uni-easyinput placeholder="留言反馈用户ID/回复留言用户ID，参考uni-id-users表" v-model="formData.user_id" />
</uni-forms-item>
<uni-forms-item name="create_date" label="">
  <uni-datetime-picker return-type="timestamp" :value="formData.create_date" />
</uni-forms-item>
<uni-forms-item name="content" label="">
  <uni-easyinput placeholder="留言内容/回复内容" v-model="formData.content" trim="right" />
</uni-forms-item>
<uni-forms-item name="imgs" label="">
  <uni-data-checkbox :multiple="true" v-model="formData.imgs" />
</uni-forms-item>
<uni-forms-item name="is_reply" label="">
  <switch @change="binddata('is_reply', $event.detail.value)" :checked="formData.is_reply" />
</uni-forms-item>
<uni-forms-item name="feedback_id" label="">
  <uni-easyinput placeholder="被回复留言ID" v-model="formData.feedback_id" />
</uni-forms-item>
<uni-forms-item name="contact" label="">
  <uni-easyinput placeholder="联系人" v-model="formData.contact" trim="both" />
</uni-forms-item>
<uni-forms-item name="mobile" label="">
  <uni-easyinput placeholder="联系电话" v-model="formData.mobile" trim="both" />
</uni-forms-item>
<uni-forms-item name="reply_count" label="">
  <uni-easyinput placeholder="被回复条数" type="number" v-model="formData.reply_count" />
</uni-forms-item>

      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-feedback.js';

  const db = uniCloud.database();
  const dbCollectionName = 'opendb-feedback';

  function getValidator(fields) {
    let reuslt = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        reuslt[key] = validator[key]
      }
    }
    return reuslt
  }

  export default {
    data() {
      return {
        formData: {
  "user_id": "",
  "create_date": null,
  "content": "",
  "imgs": [],
  "is_reply": null,
  "feedback_id": "",
  "contact": "",
  "mobile": "",
  "reply_count": null
},
        formOptions: {},
        rules: {
          ...getValidator(["user_id","create_date","content","imgs","is_reply","feedback_id","contact","mobile","reply_count"])
        }
      }
    },
    onLoad(e) {
      const id = e.id
      this.formDataId = id
      this.getDetail(id)
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.submit().then((res) => {
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 clientDB 提交数据
        db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field('user_id,create_date,content,imgs,is_reply,feedback_id,contact,mobile,reply_count').get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>
