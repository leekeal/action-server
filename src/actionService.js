actionService = function(io,users){
	self = this;
	//this前缀的 == public
	this.io = io;
	this.users = users;

	this.start = function(){
		watchConnection();
	}
	// private
	watchConnection = function(){
		self.io.sockets.on('connection',function(socket){
			self.socket = socket;
			online(socket);
			action(socket);
			disconnect(socket);
		});
	}

	online = function(socket){
		socket.on('online',function(data){
			socket.name = data.user;
			if(!self.users[data.user]){
				self.users[data.user] = data.user;
			}
			self.io.sockets.emit('online',{users:self.users,user:data.user});
		});
	}

	action = function(socket){
		socket.on('action',function(data){
			socket.broadcast.emit('action', data);
		});
	}

	disconnect = function(socket){
		//有人下线
		socket.on('disconnect', function() {
			//若 users 对象中保存了该用户名
			if (self.users[socket.name]) {
				//从 users 对象中删除该用户名
				delete self.users[socket.name];
				//向其他所有用户广播该用户下线信息
				socket.broadcast.emit('offline', {users: self.users, user: socket.name});
			}
		});
	}
}



module.exports = actionService;