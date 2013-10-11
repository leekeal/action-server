
/*
* GET home page.
*/
module.exports = function(users){
    var users = users; 
    //首页
    this.index = function(req, res){
        if (req.cookies.user == null) {
            res.redirect('/signin');
        } else {
            res.render('index');
        }
    };

    //登录页面
    this.get_signin = function(req,res){
        res.render('signin', { title: 'Express' });
    }
    //登录处理
    this.post_signin = function(req,res){
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
}