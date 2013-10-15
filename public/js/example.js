//htmlを読み込む完了から　含んているプログラムを実行
$(document).ready(function(){
	//action交換サービスをスタートする
	service = new service();
	//この表でputactionからくれたデータを解析して、対応する関すを呼び出す
	service.actionHandlers = {
		color:'changeColorHandler',
		am:'animationHandler',
		drag:'dragHandler',
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
	$(".animation button#start").click(function(){
		makeRandomAnimation();
	});
	$(".animation button#stop").click(function(){
		service.animationSwitch = 'stop';
		service.putAction('am',{'switch':'stop'});
	});



});

//アニメーションを生成する関数
function makeRandomAnimation(){
	var div=$("#example");
	service.animationSwitch = 'start';
	
		// randomAnimationHandler({top:top,left:left});
		step();
		function step(){
			if (service.animationSwitch == 'start') {
				var top = Math.random()*(300-50+1)+50;
				var left = Math.random()*(360-50+1)+50;
				service.putAction('am',{'switch':'start',top:top,left:left});
				div.animate({top:top,left:left,opacity:'0.8'},500,function(){
					step();
				});

			}
		}
	}
	




	/*
	service.putAction('color','hello world');
	animationHandler('am1');service.putAction('am','am1');
	animationHandler('am2');service.putAction('am','am2');
	*/
