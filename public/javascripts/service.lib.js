/*
api表
service.login(username,callback(username));
service.logout();
service.putAction(data);
*/

/*
//新しいactionがあったら、この関数を実行される。		
service.actionEvent= function(data){ここコマンドを書く	};
*/

function service(){
	self = this;
	this.socket = io.connect();
	this.test = 1;
	this.from = $.cookie('user');

	//実行関数	
	this.listenAction();
	this.login();
}

service.prototype.listenAction = function(){
	this.socket.on('action',function(data){
		fn = window[self.actionHandlers[data.type]];
		if (typeof(fn) == 'function') {
			fn(data.data);
		};
	});
}

service.prototype.putAction = function(type,data){
	this.socket.emit('action',{type:type,data:data});
}

service.prototype.login = function(){
	this.socket.emit('online',{user:this.from});
}

service.prototype.logout = function(){
	$.cookie('user',null);
	location.reload();
}

service.prototype.time = function(){
	var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    return time;
}