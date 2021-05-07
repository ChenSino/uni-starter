'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	//返回数据给客户端
	return uniCloud.database().collection('opendb-news-articles').field({'_id':false}).get()
	
};
