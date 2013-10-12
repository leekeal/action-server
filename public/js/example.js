//実行
$(document).ready(function(){
	service = new service();
	service.actionHandlers = {
		so:'soundHandler',
		im:'imageHandler',
		bg:'changeBackgroundColor',
		size:'sizeHandler',
		am:'animationHandler',
		drag:'dragHandler'
	};


	$("button#logout").click(function(){
		service.logout();
	});

	$("#example").draggable({
		drag: function(event,ui){
			x = $(this).position();
			service.putAction('drag',{top:x.top,left:x.left});
		}
	});

});


//関数
function dragHandler(data){
	$("#example").css("top",data.top).css("left",data.left);
}

function sizeHandler(data){
	$("#example").height(data);
}
function changeBackgroundColor(data){
	$("#example").css("background-color",data);
}
function animationHandler(data){
	am1 = function(){
		var div=$("#example");
    div.animate({height:'300px',opacity:'0.4'},"slow");
    div.animate({width:'300px',opacity:'0.8'},"slow");
    div.animate({height:'100px',opacity:'0.4'},"slow");
    div.animate({width:'100px',opacity:'0.8'},"slow");
	}
	am2 = function(){
		var div=$("#example");
		div.animate({width:'300px'});
	}
	window[data]();
}



function listenOnlineEvent(users,user){
	if ($.cookie('user') == user) {
		$("#username").text(user);
		for(user in users){
			$("#userList").append('<li class="list-group-item user" id = "'+user+'">'+user+'</li>');
		}
	}
	else{
		$("#userList").append('<li class="list-group-item user" id = "'+user+'">'+user+'</li>');
	}
	console.log(user+'ログインした');
}
function listenOfflineEvent(users,user){
	$(".user#"+user).remove();
	console.log(user+'ログアウトした');
}


	/*
	service.putAction('so','hello world');
	service.putAction('im','my image');
	service.putAction('bg','green');
	service.putAction('size','100');
	animationHandler('am1');service.putAction('am','am1');
	animationHandler('am2');service.putAction('am','am2');
	*/
