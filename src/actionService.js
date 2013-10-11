actionService = function(io,users){
	self = this;
	this.io = io;
	this.users = users;

	this.start = function(){
		this.watchConnection();
	}

	this.watchConnection = function(){
		this.io.sockets.on('connection',function(socket){
			self.socket = socket;
			self.online(socket);
			self.say(socket);
			self.action(socket);
			self.disconnect(socket);
		});
	}

	this.online = function(socket){
		socket.on('online',function(data){
			console.log(self.users);
			socket.name = data.user;
			if(!self.users[data.user]){
				self.users[data.user] = data.user;
			}
			self.io.sockets.emit('online',{users:self.users,user:data.user});
		});
	}

	this.say = function(socket){
		//有人发话
		socket.on('say', function (data) {
			if (data.to == 'all') {
				//向其他所有用户广播该用户发话信息
				socket.broadcast.emit('say', data);
			} 
			else {
				//向特定用户发送该用户发话信息
				//clients 为存储所有连接对象的数组
				var clients = io.sockets.clients();
				//遍历找到该用户
				clients.forEach(function (client) {
				if (client.name == data.to) {
				//触发该用户客户端的 say 事件
				client.emit('say', data);
				}
				});
			}
		});
	}

	this.action = function(socket){
		socket.on('action',function(data){
			console.log('--->'+data);
			socket.broadcast.emit('action', data);
		});
	}

	this.disconnect = function(socket){
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