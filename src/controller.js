
/*
* GET home page.
*/
module.exports = function(sessionStore){
    var sessionStore = sessionStore; 
    //首页
    this.index = function(req, res){
        if (req.session.user == null) {
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
        req.session.user = req.body.name;
        res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*30});
        res.redirect('/'); 
    }
    this.get_logout = function(req,res){
        req.session.user = null;
        res.send('logout ok');
    }
}