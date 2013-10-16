var Controller = require('../app/controllers/controller');
module.exports = function (app,sessionStore) {
controller = new Controller(sessionStore);

	//路由
app.get('/', controller.index);
app.get('/login', controller.get_signin);
app.post('/login', controller.post_signin);
app.get('/logout', controller.get_logout);
}