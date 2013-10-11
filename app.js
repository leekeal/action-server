
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var app = express();
//user module
var chat = require('./routes/chat');
var chatService = require('./module/chatService');

// all environments システム環境設定
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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


//路由
app.get('/', chat.index);
app.get('/signin', chat.get_signin);
app.post('/signin', chat.post_signin);

//Http サーバを起動		
HttpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//socket　サーバを起動
io = io.listen(HttpServer);
//chat　serviceを起動
new chatService(io,chat).start();