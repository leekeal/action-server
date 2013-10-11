
/*
 * GET home page.
 */

 var users = {};
 exports.get_users = function(){
 	return users;
 }
 exports.set_users= function(user){
 	users[user] = user;
 }
 exports.del_user = function(user){
 	delete users[user];
 }

 //首页
 exports.index = function(req, res){
 	if (req.cookies.user == null) {
 		res.redirect('/signin');
 	} else {
 		res.render('index', { title: 'Express' });
 	}
 };

//登录页面
exports.get_signin = function(req,res){
	res.render('signin', { title: 'Express' });
}
//登录处理
exports.post_signin = function(req,res){
	if (users[req.body.name]) {
    //存在，则不允许登陆
    res.redirect('/signin');
    }
    else {
    //不存在，把用户名存入 cookie 并跳转到主页
    res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*30});
    res.redirect('/');	
    }
}