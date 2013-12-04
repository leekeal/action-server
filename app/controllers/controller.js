
/*
* GET home page.
*/

exports.index = function(req, res){
    if (req.session.user == null) {
        res.redirect('/login');
    } else {
        res.render('index');
    }
}
//登录页面
exports.get_signin = function(req,res){
    res.render('login', { title: 'Express' });
}
//登录处理
exports.post_signin = function(req,res){

    if (req.body.username&&!req.sessionStore.users[req.body.username]) {
        req.session.user = req.body.username;
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    } 
}
exports.get_logout = function(req,res){
    req.session.user = null;
    res.send('logout ok');
}
