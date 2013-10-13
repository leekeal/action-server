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

	//実行関数	
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
		if(typeof(onlineEventHandler) == 'function'){
			onlineEventHandler(data.users,data.user);
		}
	});
}
service.prototype.offlineEvent = function(){
	this.socket.on('offline',function(data){
		if (typeof(offlineEventHandler) == 'function') {
			offlineEventHandler(data.users,data.user);
		};
	});
}

service.prototype.putAction = function(type,data){
	this.socket.emit('action',{type:type,data:data});
}

service.prototype.autoAction = function(type,data){
	fn = window[self.actionHandlers[type]];
	if (typeof(fn) == 'function') {
		fn(data);
	};
	this.socket.emit('action',{type:type,data:data});
}

service.prototype.logout = function(){
	console.log('???');
	$.get("/logout", function(data){
		console.log('I logout!');
		location.reload();
	});
}

service.prototype.time = function(){
	var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    return time;
}