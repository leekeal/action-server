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
	this.markActiveUsersLock = {};
	this.debug = false;
	this.user = null;

	//実行関数	
	this.actionEvent();
	this.onlineEvent();
	this.offlineEvent();
	this.recordEventListent();
}

service.prototype.actionEvent = function(){
	this.socket.on('action',function(data){
		if (self.debug) {
			console.group(data.from+' ➡➡➡ '+data.type + ': '+self.actionHandlers[data.type]+'()');
			console.debug(data.data);
			console.groupEnd();
		};

		if (!self.actionHandlers[data.type]) {
			console.error('service.actionHandlersに'+data.type+'を処理する関数を指定していません!!!');
		}
		else{
			fn = window[self.actionHandlers[data.type]];
			if (typeof(fn) == 'function') {
				fn(data.data,data.from);
				//mark active user
				self.markActiveUser(data); 
			}else{
				console.error(self.actionHandlers[data.type]+'を定義していません!!!');
			}

		}
	});
}

service.prototype.runAction = function(data){
	if (!self.actionHandlers[data.type]) {
		console.error('service.actionHandlersに'+data.type+'を処理する関数を指定していません!!!');
	}
	else{
		fn = window[self.actionHandlers[data.type]];
		if (typeof(fn) == 'function') {
			fn(data.data,data.from);
				//mark active user
				self.markActiveUser(data); 
			}
			else{
				console.error(self.actionHandlers[data.type]+'を定義していません!!!');
			}

	}

}

service.prototype.onlineEvent = function(){
	this.socket.on('online',function(data){
		if(typeof(onlineEventHandler) == 'function'){
			if (data.self) {
				self.user = data.user;
			};
			onlineEventHandler(data.users,data.user,data.self);
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
	//mark active user
	self.markActiveUser({from:self.user}); 
}

service.prototype.autoAction = function(type,data){
	fn = window[self.actionHandlers[type]];
	if (typeof(fn) == 'function') {
		fn(data);
	};
	this.socket.emit('action',{type:type,data:data});
	//mark active user
	self.markActiveUser({from:self.user}); 
}

service.prototype.logout = function(){
	$.get("/logout", function(data){
		console.log('I logout!⬇⬇⬇');
		location.reload();
	});
}
service.prototype.record = function(action,name){
	this.socket.emit('record',{'action':action,'name':name});
}
service.prototype.recordEventListent = function(){
	this.socket.on('record',function(data){
		recordRemoteEventHandler(data);
	});
}

service.prototype.time = function(){
	var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    return time;
}

service.prototype.markActiveUser = function(data){
	now = new Date().getTime();
	if (!self.markActiveUsersLock[data.from] || (now - self.markActiveUsersLock[data.from] >2000)) {
		if (typeof(markActiveUserHandler) == 'function') {
			markActiveUserHandler(data);
		};
		self.markActiveUsersLock[data.from] = now;

	}
}


//記録local処理
function recordLocalEventHandler(event,eventName){
    $e = $(event.target);
    if (eventName == 'start') {
        $e.attr('onsubmit',"return recordLocalEventHandler(event,'stop')");
        $e.children('button').html('記録Stop').addClass('btn-success');
        $e.children('input').attr('readonly','readonly');
        service.record('start',$e.children("input").val());
    }
    else if (eventName == 'stop') {
        $e.attr('onsubmit',"return recordLocalEventHandler(event,'start')");
        $e.children('button').html('記録Start').removeClass('btn-success');
        $e.children('input').removeAttr('readonly').val('');

        service.record('stop',null);
    }
    return false;
}
//記録remote処理
function recordRemoteEventHandler(data){
    if (data.action == 'recordding') {
        if (data.user == service.user) {
         $("#record form").attr('onsubmit',"return recordLocalEventHandler(event,'stop')");
         $("#record button").html('記録Stop').addClass('btn-success');
         $("#record input").val(data.name).attr('readonly','readonly');
        }
        else{
           $("#record button").html('記録中').addClass('btn-info').attr('disabled','disabled');
           $("#record input").val(data.name).attr('readonly','readonly');
        }
    }
    else if (data.action == 'stop') {
        $("#record button").html('記録Start').removeClass('btn-info');
        $("#record button").removeAttr('disabled');
        $("#record input").removeAttr('readonly').val('');
    }
    else if (data.action == 'list') {
        var dom = '';
        data.list.forEach(function(recordName){
            dom += '<option value="' +recordName+'">'+recordName+' <span class="glyphicon glyphicon-play"></span></option>' 
        });
        $("#recordList").html(dom);
    }
    else if(data.action == 'read'){

    	var worker = new Worker('js/record-worker.js');
    	worker.postMessage(data);
    	
    	worker.addEventListener('message', function(e) {
        	service.runAction(e.data);//actionを実行
		}, false);
    };

}

function readRecord(){
    var recordName = $("#recordList").val();
    service.record('read',recordName);
}

