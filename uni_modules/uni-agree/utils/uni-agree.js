export default function(){
	if (uni.getSystemInfoSync().platform == "android") {
		let userprotocol = uni.getStorageSync('userprotocol') || false;
		if(!userprotocol){
			uni.navigateTo({
				url:'uni_modules/uni-agree/pages/uni-agree/uni-agree',
				animationType:"none"
			})
		}
	}
}