var express = require('express');
var fs = require('fs');
var http = require('http');
var io = require('socket.io');
var sessionStore = new express.session.MemoryStore({reapInterval: 60000 * 10});
sessionStore.users = {};
var app = express();

//app settings
var env = process.env.NODE_ENV || 'development'
	,config = require('./config/config')[env];

var mongoose = require('mongoose');
// Bootstrap db connection
mongoose.connect(config.mongodb);
// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

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

// 关闭socket.io的debug
// io.set('log level', 1);

//action serviceを起動
var actionService = require('./app/controllers/actionService');
new actionService(io,sessionStore).start();

// expose app
exports = module.exports = app;


// var DB = require('./config/database');
