<template>
	<uni-popup ref="popup" type="center" :maskClick="false">
		<view class="update-wrap">
			<view class="white-bg"></view>
			<image src="@/static/images/top_2.png" class="updateCon-img"></image>
			<view class="updateCon-top">
				<!-- 发现新版本 -->
				<text class="update-top-title">发现新版本</text>
				<text class="update-top-version">V{{update_info.version}}</text>
			</view>

			<text class="uodate-content" v-if="!update_ing">更新内容:{{update_info.version_note}}</text>
			<text class="current-version" v-if="!update_ing">当前版本:V{{version}}</text>

			<view class="update-btn" v-if="!update_ing">
				<view class="update-btn-item update-btn-left" @click="up_close">
					<!-- 残忍拒绝 -->
					<text class="update-btn-item-text ">残忍拒绝</text>
				</view>
				<view class="update-btn-item" @click="nowUpdate">
					<!-- 立即升级 -->
					<text class="update-btn-item-text text-bule">立即升级</text>
				</view>
			</view>
			<!-- 下载进度 -->
			<view class="sche-wrap" v-if="update_ing">
				<!-- 更新包下载中 -->
				<text class="sche-wrap-text">更新包下载中...</text>
				<view class="sche-bg">
					<view class="sche-bg-jindu" :style="lengthWidth">
						<view class="sche-bg-round">
							<text class="sche-bg-round-text" v-if="schedule">{{schedule}}%</text>
							<text class="sche-bg-round-text" v-else>{{(downloadedSize/1024/1024 ).toFixed(2)}}M</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>

</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				platform: "", //ios or android
				version: "1.0.0", //当前软件版本
				is_update: false, // 是否更新
				is_reques: false, //是否请求中

				update_info: {
					"type": "1", //1分发平台更新  2安装包/升级包更新
					"version_note": "", //ios更新备注
					"version": "1.0.0", //ios版本号
					"download_url": "", //ios更新新链接
				},

				is_update: false,
				schedule: 0,
				update_ing: false, //点击升级
				is_down: false,
				downloadedSize: 0,
			};
		},
		components:{uniPopup},
		mounted() {
			this.getSystemInfo() //获取系统新
		},
		computed: {
			// 下载进度计算
			lengthWidth: function() {
				return {
					width: this.schedule * 480 / 100 + "rpx"
				}
			}
		},
		methods: {
			// 获取系统信息
			getSystemInfo() {
				let vm = this;
				// 获取手机系统信息
				uni.getSystemInfo({
					success: function(res) {
						vm.platform = res.platform //ios  or android
					}
				});
				// 获取版本号
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					vm.version = inf.version
				});
				vm.getUpdateInfo(); //获取更新信息
			},

			// 获取线上版本信息
			getUpdateInfo() {
				let vm = this;
				uni.request({
					url: 'http://ui.ishenghuo.org.cn/api/version.php', //仅为示例，并非真实接口地址。
					success: (res) => {
						let data = res.data.data;
						if (vm.platform == "ios") {
							vm.update_info.type = data.ios_type
							vm.update_info.version_note = data.ios_version_note
							vm.update_info.version = data.ios_version
							vm.update_info.download_url = data.ios_download_url
						} else if (vm.platform == "android") {
							vm.update_info.type = data.android_type
							vm.update_info.version_note = data.android_version_note
							vm.update_info.version = data.android_version
							vm.update_info.download_url = data.android_download_url
						} else {
							return false
						}
						vm.checkUpdate(); ///检查是否更新
					}
				});
			},
			// 检查是否更新
			checkUpdate() {
				let vm = this;
				vm.is_update = vm.compareVersion(vm.version, vm.update_info.version); // 检查是否升级
				if (vm.is_update) {
					vm.$refs.popup.open() //显示升级弹窗
				} else {
					// 不更新，根据需要做处理
				}
			},

			// 取消更新
			up_close() {
				// console.log('点击取消')
				plus.os.name == "Android" ? plus.runtime.quit() : plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
			},
			// 立即更新
			nowUpdate() {
				let vm = this;
				if(vm.is_reques){
					return false   //如果正在下载就停止操作
				}else{
					vm.is_reques = true
				}
				console.log(111111);
				if (vm.update_info.type == 1) {
					// 分发平台更新  //调用浏览器打开链接或者分发平台
					plus.runtime.openURL(vm.update_info.download_url, function() {
						plus.nativeUI.toast("打开错误");
					});

					setTimeout(function() {
						plus.runtime.quit(); //五秒后关闭app
					}, 5000)
				} else if (vm.update_info.type == 2) {
					// 安装包/升级包更新
					vm.download_wgt()
				}

			},
			// 下载升级资源包
			download_wgt() {
				let vm = this;
				plus.nativeUI.showWaiting("下载更新文件..."); //下载更新文件...
				let options = {
					method: "POST"
				};

				let dtask = plus.downloader.createDownload(vm.update_info.download_url, options);
				dtask.addEventListener("statechanged", function(task, status) {
					switch (task.state) {
						case 1: // 开始  
							break;
						case 2: //已连接到服务器  
							vm.update_ing = true;
							break;
						case 3: // 已接收到数据  
							vm.downloadedSize = task.downloadedSize;
							let totalSize = 0;
							if (task.totalSize) {
								totalSize = task.totalSize //服务器须返回正确的content-length才会有长度
							}
							vm.schedule = parseInt(100 * task.downloadedSize / totalSize);
							break;
						case 4:
							vm.installWgt(task.filename); // 安装wgt包  
							break;
					}
				});
				dtask.start();
			},

			// 安装文件
			installWgt(path) {
				let vm = this;
				plus.nativeUI.showWaiting("安装更新文件..."); //安装更新文件...
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.closeWaiting();
					// 应用资源更新完成！
					plus.nativeUI.alert("应用资源更新完成！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.closeWaiting();
					// 安装更新文件失败
					plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
				});
			},
			// 对比版本号
			compareVersion(ov, nv) {
				if (!ov || !nv || ov == "" || nv == "") {
					return false;
				}
				let b = false,
					ova = ov.split(".", 4),
					nva = nv.split(".", 4);
				for (let i = 0; i < ova.length && i < nva.length; i++) {
					let so = ova[i],
						no = parseInt(so),
						sn = nva[i],
						nn = parseInt(sn);
					if (nn > no || sn.length > so.length) {
						return true;
					} else if (nn < no) {
						return false;
					}
				}
				if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
					return true;
				} else {
					return false;
				}
			},
		}

	}
</script>

<style scoped>
	/*#ifndef APP-NVUE*/
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
	/*#endif*/

	.updateBox {
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 1000;
		position: fixed;
		right: 0px;
		top: 0;
		left: 0;
		bottom: 0;
		align-items: center;
		justify-content: center;
	}

	.update-wrap {
		width: 580rpx;
		height: 500rpx;
		border-radius: 10px;
		padding-bottom: 0px;
		position: relative;
	}

	.white-bg {
		position: absolute;
		top: 60rpx;
		left: 0px;
		width: 580rpx;
		height: 440rpx;
		background-color: #ffffff;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}

	.updateCon-img {
		position: absolute;
		top: 0rpx;
		left: 0px;
		width: 580rpx;
		height: 440rpx;
	}

	.updateCon-top {
		padding: 70rpx 50rpx;
		/*#ifndef APP-NVUE*/
		z-index: 1;
		/*#endif*/
	}

	.update-top-title {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
	}

	.update-top-version {
		color: #fff;
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.uodate-content {
		color: #333;
		font-size: 18px;
		padding: 0px 50rpx;
		margin-top: 80rpx;
		/*#ifndef APP-NVUE*/
		z-index: 1;
		/*#endif*/
	}

	.current-version {
		text-align: center;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #666;
		/*#ifndef APP-NVUE*/
		z-index: 1;
		/*#endif*/
	}

	.update-btn {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 580rpx;
		height: 80rpx;
		padding: 0px 50rpx;

		align-items: center;
		flex-direction: row;
		border-top-color: #e7e7e7;
		border-top-style: solid;
		border-top-width: 1px;

		background-color: #fff;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}

	.update-btn-item {
		width: 240rpx;
		height: 80rpx;
		justify-content: center;
		align-items: center;
	}

	.update-btn-left {
		border-right-color: #e7e7e7;
		border-right-style: solid;
		border-right-width: 1px;
	}

	.update-btn-item-text {
		text-align: center;
		font-size: 28rpx;
		color: #666;
	}

	.text-bule {
		color: #045FCF;
	}

	.sche-wrap {
		padding: 0px 50rpx 0rpx;
		height: 100rpx;
		align-items: center;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		flex: 1;
		justify-content: flex-end;
	}

	.sche-wrap-text {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 20rpx;
	}

	.sche-bg {
		position: relative;
		background-color: #ccc;
		height: 20rpx;
		border-radius: 100px;
		width: 480rpx;
		margin-bottom: 30rpx;
	}

	.sche-bg-jindu {
		position: absolute;
		left: 0px;
		top: 0px;
		height: 20rpx;
		background-color: #5775e7;
		border-radius: 100px;
	}

	.sche-bg-round {
		position: absolute;
		left: 100%;
		height: 24rpx;
		width: 24rpx;
		background-color: #fff;
		border-color: #fff;
		border-style: solid;
		border-width: 10px;
		border-radius: 100px;
		transform: translateX(-20rpx) translateY(-10rpx);

	}

	.sche-bg-round-text {
		font-size: 24rpx;
		width: 120rpx;
		text-align: center;
		transform: translateX(-50rpx) translateY(-40rpx);
		color: #5775e7;
	}

	.uodate-close {
		/* display: flex; */
		flex-direction: row;
		justify-content: center;
		padding-top: 50rpx;
	}

	.uodate-close-img {
		width: 80rpx;
		height: 80rpx;
	}
</style>
