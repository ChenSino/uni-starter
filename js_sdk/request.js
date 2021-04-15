/*
1.优雅访问指定路由地址
2.load自动显示与关闭
3.统一路由拦截
	3.1 读取云端接口权限配置，先验证本地token再访问
	3.2 处理因token过期等问题自动更新本地token，或token无效跳转至登陆页面
*/
const debug = true;//开启后，会alert错误信息
export default function request(name,params,callback=false,{showLoading=false,loadText='',fail=()=>{}}={}){
	// console.log('request');
	showLoading||loadText? uni.showLoading({title:loadText}):'';
	
	let routers =  name.split('/');
	var action = false
	if (routers.length>1){
		name = routers[0]
		action =  routers[1]
	}
	console.log({name,data: {action,params}})
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({name,data: {action,params},
			success(e){
				// console.log(e);
				if(showLoading || loadText) uni.hideLoading()
				const {result:{data,code}} = e
				console.log(data,code);
				if (code === 0 ) {
					resolve(e)
					return callback(data,e.result,e)
				}
				if(debug){
					uni.showModal({
						content: JSON.stringify(e),
						showCancel: false,
						confirmText: '知道了'
					})
				}
			},
			fail(err){
				reject(err)
				console.log(err);
				if(debug){
					uni.showModal({
						content: JSON.stringify(err),
						showCancel: false,
						confirmText: '知道了'
					})
				}
				fail(err)
			}
		})
	})
}