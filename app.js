
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var app = express();
//user module
var Controller = require('./src/controller');
var actionService = require('./src/actionService');

// all environments システム環境設定
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//ユーザー変数	
var users = {};
controller = new Controller(users);
//路由
app.get('/', controller.index);
app.get('/signin', controller.get_signin);
app.post('/signin', controller.post_signin);

//Http サーバを起動		
HttpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//socket　サーバを起動
io = io.listen(HttpServer);
//action serviceを起動
new actionService(io,users).start();