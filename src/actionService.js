actionService = function(io,sessionStore){
	self = this;
	//this前缀的 == public
	this.io = io;


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
			self.io.sockets.emit('online',{users:sessionStore.users,user:user});

			action(socket);
			disconnect(socket);
		});
	}

	action = function(socket){
		socket.on('action',function(data){
			socket.broadcast.emit('action', data);
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


}



module.exports = actionService;