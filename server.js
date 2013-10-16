var express = require('express');
var http = require('http');
var io = require('socket.io');
var actionService = require('./src/actionService');
var sessionStore = new express.session.MemoryStore({reapInterval: 60000 * 10});
sessionStore.users = {};
var app = express();

//app settings
var config = require('./config/config');
// express settings
require('./config/express')(app, config,sessionStore);

// Bootstrap routes
require('./config/routes')(app,sessionStore);

//Http サーバを起動                
HttpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('------>Action-Server listening on port ' + app.get('port'));
});

//socket　サーバを起動
io = io.listen(HttpServer);
//action serviceを起動
new actionService(io,sessionStore).start();

// expose app
exports = module.exports = app;