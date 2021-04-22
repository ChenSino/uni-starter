export default function(){
	if (uni.getSystemInfoSync().platform == "android") {
		let iKnowAgree = uni.getStorageSync('iKnowAgree') || false;
		if(!iKnowAgree){
			uni.navigateTo({
				url:'uni_modules/uni-agree/pages/uni-agree/uni-agree',
				animationType:"none"
			})
		}
	}
}