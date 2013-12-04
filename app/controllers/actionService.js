var fs = require('fs');
actionService = function(io,sessionStore){
	self = this;
	//this前缀的 == public
	this.io = io;
	this.record = null;

	this.start = function(){
		//sessionを確認する
		authorization();
		//connectionを始まる
		watchConnection();
	}

	//sessionを確認する関数　authorization-承認-授权
	authorization = function(){
		self.io.set('authorization', function(handshakeData, callback){
			 //没有cookie则退出
      		if (!handshakeData.headers.cookie) return callback('socket.io: no found cookie.', false);
			var signedCookies = require('express/node_modules/cookie').parse(handshakeData.headers.cookie);
			handshakeData.cookies = require('express/node_modules/connect/lib/utils').parseSignedCookies(signedCookies,
			'action');

				//根据sessionId找username
	      	sessionStore.get(handshakeData.cookies['sid'], function(err,session){
		        if(err || !session) return callback('socket.io: no found session.', false);
		        handshakeData.session = session;
		        if(handshakeData.session.user){ 
		          return callback(null, true);
		        }
		        else{
		          return callback('socket.io: no found session.user', false);
	       		}
	     	});
	    });
	}
	
	// private
	watchConnection = function(){
		self.io.sockets.on('connection',function(socket){
			//authorization関数のsessionを判断するが通った、会話を始まる
			var session = socket.handshake.session;//session
			var user = session.user;
			//現在のsocketに名前をつける
			socket.name = user;
			//sessionStore.users　list中にuserが不存在の場合、userをsessionStore.usersに加える
			if(!sessionStore.users[user]){
				sessionStore.users[user] = user;
			}
			//自分を含めて、全員に今ログインしたユーザーの名前を放送する
			// self.io.sockets.emit('online',{users:sessionStore.users,user:user});
			socket.emit('online',{users:sessionStore.users,user:user,self:true});
			socket.broadcast.emit('online', {users:sessionStore.users,user:user,self:false});
			//ログインする時、recordを行っているのかを判断する。
			recordLoginHandler(socket);
			//put record list
			putRecordList(socket);

			action(socket);
			recordEventListen(socket);
			disconnect(socket);
		});
	}

	action = function(socket){
		socket.on('action',function(data){
			data.from = socket.name;
			socket.broadcast.emit('action', data);
			writeRecord(data);
		});
	}
	recordEventListen = function(socket){
		socket.on('record',function(data){
			if (data.action == 'start') {
				self.record = data;
				self.record.action = 'recordding';
				self.record.startTime = new Date().getTime();
				self.record.user = socket.name;
				//write record message to other users 
				socket.broadcast.emit('record',self.record);
				console.log(self.record);

				var recordInfo = {'name':self.record.name,'user':self.record.user,'time':getTime()};
				recordInfo = JSON.stringify(recordInfo);
				fs.appendFile('record/'+self.record.name+'.log',recordInfo+"\n", function (err) {
					if (err) throw err;
					console.log('The "data to append" was appended to file!'); 
				});
			}
			else if (data.action == 'stop') {
				socket.broadcast.emit('record',{'action':'stop'});
				putRecordList(socket,'all');
				delete self.record;
			}
			//record json dataを返す
			else if (data.action == 'read') {
				readRecord(socket,data.name);
			}
			else if (data.action == 'list') {

			};
		});
	}
	recordLoginHandler = function(socket){
		if (self.record != undefined) {
			socket.emit('record',self.record);
		}

	}
	writeRecord = function(data){
		if (self.record != undefined && self.record.action == 'recordding') {
			data.runTime = new Date().getTime();
			data = JSON.stringify(data);
			fs.appendFile('record/'+self.record.name+'.log',data+"\n", function (err) {
				if (err) throw err;
				console.log('The "data to append" was appended to file!'); 
			});
		};
	}
	putRecordList = function(socket,to){
		fs.readdir('./record/',function(err,list){
			if (err) throw err;
			var data = {'action':'list','list':list}
			if (to == 'all') {
				self.io.sockets.emit('record',data);
			}
			else{
				socket.emit('record',data);
			};
		});
	}
	readRecord = function(socket,name){
		console.log(name);
		fs.readFile('./record/'+name,{encoding:'utf8'},function(err,data){
			if (err) throw err;
			data = data.split('\n');
			var result = {info:null,record:new Array()};
			console.log(data.length);
			for (var i = 0; i < data.length-1; i++) {
				if (i==0) {
					result.info = JSON.parse(data[i]);
				}
				else{
					result.record.push(JSON.parse(data[i]))
				}
			};
			result.action = 'read';
			//put record data to browser
			socket.emit('record',result);
		});
	}
	//オフライン　イベントを処理
	disconnect = function(socket){
		//有人下线
		socket.on('disconnect', function() {
			//若 sessionStore.users 对象中保存了该用户名
			if (sessionStore.users[socket.name]) {
				//从 sessionStore.users 对象中删除该用户名
				delete sessionStore.users[socket.name];
				//向其他所有用户广播该用户下线信息
				socket.broadcast.emit('offline', {users: sessionStore.users, user: socket.name});
			}
		});
	}

	getTime = function(){
		var date = new Date();
		var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
		return time;
	}


}



module.exports = actionService;