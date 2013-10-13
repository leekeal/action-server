//htmlを読み込む完了から　含んているプログラムを実行
$(document).ready(function(){
	//action交換サービスをスタートする
	service = new service();
	//この表でputactionからくれたデータを解析して、対応する関すを呼び出す
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

	//ドラッグイベントをモニターする
	$("#example").draggable({
		containment:"#container",
		scroll: false,
		drag: function(event,ui){
			x = $(this).position();
			service.putAction('drag',{top:x.top,left:x.left});
		}
	});
	//アニメーションを選ぶボタンをモニターする
	$(".animation button").click(function(){
		animationName = $(this).attr('animation');
		animationHandler(animationName);
		service.putAction('am',animationName);
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
//アニメーションを実行関数
function animationHandler(data){
	am1 = function(){
		var div=$("#example");
    div.animate({height:'300px',opacity:'0.4'},"slow");
    div.animate({width:'300px',opacity:'0.8'},"slow");
    div.animate({height:'100px',opacity:'0.4'},"slow");
    div.animate({width:'100px',opacity:'0.8'},"slow");
    div.animate({height:'80px',opacity:'0.4'},"slow");
    div.animate({width:'80px',opacity:'0.8'},"slow");
    div.animate({height:'300px',opacity:'0.4'},"slow");
    div.animate({width:'300px',opacity:'0.8'},"slow");
    div.animate({height:'80px',opacity:'0.4'},"slow");
    div.animate({width:'80px',opacity:'0.8'},"slow");
	}
	am2 = function(){
		var div=$("#example");
    	div.animate({left:'10px',opacity:'0.8'},"slow");
    	div.animate({left:'300px',opacity:'0.8'},"slow");
    	div.animate({top:'300px',opacity:'0.8'},"slow");
    	div.animate({left:'150px',opacity:'0.8'},"slow");
    	div.animate({top:'10px',opacity:'0.8'},"slow");
    	div.animate({top:'300px',opacity:'0.8'},2000);
    	div.animate({left:'200px',opacity:'0.8'},"slow");
    	div.animate({left:'100px',opacity:'0.8'},"slow");
    	div.animate({top:'10px',opacity:'0.8'},"slow");
    	div.animate({left:'10px',opacity:'0.8'},"slow");
	}
	window[data]();
}


//ログインイベントを処理する
function listenOnlineEvent(users,user){
	if ($.cookie('user') == user) {
		$("#username").text(user);
		for(user in users){
			$("#userList").append('<li class="list-group-item user" id = "'+user+'"><span class="glyphicon glyphicon-user"></span>'+user+'</li>');
		}
	}
	else{
		$("#userList").append('<li class="list-group-item user" id = "'+user+'"><span class="glyphicon glyphicon-user"></span>'+user+'</li>');
	}
	console.log(user+'ログインした');
}
//ログアウトイベントを処理する
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
