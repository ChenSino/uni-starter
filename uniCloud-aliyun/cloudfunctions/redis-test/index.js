// 简单的使用示例
'use strict';
const redis = uniCloud.redis()
exports.main = async (event, context) => {
	const getResult = await redis.get('my-key')
	const setResult = await redis.set('my-key', 'value-test')
	return {
		getResult,
		setResult
	}
};
