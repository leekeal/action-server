/*
api表
service.logout();
service.putAction(type,data);
*/

/*

*/

function service(){
	self = this;
	this.socket = io.connect();
	this.test = 1;
	this.from = $.cookie('user');

	//実行関数	
	this.login();
	this.actionEvent();
	this.onlineEvent();
	this.offlineEvent();
}

service.prototype.actionEvent = function(){
	this.socket.on('action',function(data){
		fn = window[self.actionHandlers[data.type]];
		if (typeof(fn) == 'function') {
			fn(data.data);
		};
	});
}
service.prototype.onlineEvent = function(){
	this.socket.on('online',function(data){
		if(typeof(listenOnlineEvent) == 'function'){
			listenOnlineEvent(data.users,data.user);
		}
	});
}
service.prototype.offlineEvent = function(){
	this.socket.on('offline',function(data){
		if (typeof(listenOfflineEvent) == 'function') {
			listenOfflineEvent(data.users,data.user);
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