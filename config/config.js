var path = require('path');
var rootPath = path.normalize(__dirname + '/..')
module.exports = {
	//开发模式
	development: {
		mongodb: 'mongodb://localhost:27017/action',
		root: rootPath
	},


	//生产模式
	production:{
		mongodb: 'mongodb://localhost:27017/action',
		root: rootPath

	}
}