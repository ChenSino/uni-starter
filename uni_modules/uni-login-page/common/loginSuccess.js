export default function(result){
	uni.showToast({
		title: '登陆成功',
		icon: 'none'
	});
	console.log('登陆成功',result);
	uni.setStorageSync('uni_id_uid', result.uid)
	uni.setStorageSync('uni_id_token', result.token)
	uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
	//delete result.userInfo.token
	// this.setUserInfo(result.userInfo)
	
	var delta = 0//判断需要返回几层
	let pages = getCurrentPages();
	console.log(pages);
	pages.forEach((page,index)=>{
		if(pages[pages.length-index-1].route.split('/')[1] == 'uni-login-page'){
			delta ++
		}
	})
	uni.navigateBack({delta})
}