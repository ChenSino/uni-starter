export default (callback,options)=>{
	options = options||{"width":600,"height":600};
	uni.chooseImage({
		sizeType:['original'],
		count:1,
		...options,
		complete:({tempFiles:[{path}]})=> {
			uni.navigateTo({
				url:'/common/uploadCutImageToUnicloud/uploadCutImageToUnicloud?path='+path+"&options="+JSON.stringify(options),
				animationType:'fade-in',
				events:{
					url(url){
						callback(url)
					}
				}
			})
		}
	})
}