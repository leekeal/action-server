var mongoose = require('mongoose')
, User = mongoose.model('User');

exports.index = function(req,res){
	username = req.query.name;
	var user = new User({name:username,email:'@gmail.com'});
	user.save();
	res.send(req.query);

}