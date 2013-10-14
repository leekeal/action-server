//htmlを読み込む完了から　含んているプログラムを実行
$(document).ready(function(){
	//action交換サービスをスタートする
	service = new service();
	//この表でputactionからくれたデータを解析して、対応する関すを呼び出す
	service.actionHandlers = {
		color:'changeColorHandler',
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
		service.autoAction('am',animationName);
	});

});




	/*
	service.putAction('color','hello world');
	animationHandler('am1');service.putAction('am','am1');
	animationHandler('am2');service.putAction('am','am2');
	*/
