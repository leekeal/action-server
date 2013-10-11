module.exports = function(io,chat){
	
	this.start = function(){
		watchConnection();
	}

	//监控上线
	watchConnection = function(){
		io.sockets.on('connection',function(socket){
			online(socket);
			say(socket);
			action(socket);
			disconnect(socket);
		});
	}

	online = function(socket){
		socket.on('online',function(data){
			socket.name = data.user;
			if(!chat.get_users()[data.user]){
				chat.set_users(data.user);
			}
			io.sockets.emit('online',{users:chat.get_users(),user:data.user});
		});
	}

	say = function(socket){
		  //有人发话
	  socket.on('say', function (data) {
	    if (data.to == 'all') {
	      //向其他所有用户广播该用户发话信息
	      socket.broadcast.emit('say', data);
	    } else {
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

	action = function(socket){
		socket.on('action',function(data){
			console.log(data);
			socket.broadcast.emit('action', data);
		});
	}

	disconnect = function(socket){
		    //有人下线
	  socket.on('disconnect', function() {
	    //若 users 对象中保存了该用户名
	    if (chat.get_users()[socket.name]) {
	      //从 users 对象中删除该用户名
	      chat.del_user(socket.name);
	      //向其他所有用户广播该用户下线信息
	      socket.broadcast.emit('offline', {users: chat.get_users(), user: socket.name});
	    }
	  });
	}
}