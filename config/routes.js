var Controller = require('../app/controllers/controller');
var test = require('../app/controllers/test');
module.exports = function (app,sessionStore) {
controller = new Controller(sessionStore);

	//路由
app.get('/', controller.index);
app.get('/login', controller.get_signin);
app.post('/login', controller.post_signin);
app.get('/logout', controller.get_logout);


app.get('/test',test.index);
}