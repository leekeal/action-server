var mongoose = require('mongoose');
var port = 27017;
var name = "action"
mongoose.connect('mongodb://localhost:'+port+'/'+name);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '--->连接错误:'));

db.once('open', function callback () {
	console.log('数据库打开成功!!');
});
 

module.exports=mongoose;