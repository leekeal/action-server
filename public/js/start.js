//htmlを読み込む完了から　含んているプログラムを実行
$(document).ready(function(){
	//action交換サービスをスタートする
	window.service = new service();
	//この表でputactionからくれたデータを解析して、対応する関すを呼び出す
	service.actionHandlers = {
		up: 'upHandler',
		down: 'downHandler',
		right: 'rightHandler',
		left: 'leftHandler',
		yura: 'yuraHandler',
		hit:'hitHandler',

		next: 'nextHandler',
		color: 'colorHandler',
		moveimg: 'moveimgHandler',
		backimg:'backimgHandler',
		sound:'soundHandler',
		am:'animationHandler',
		drag:'dragHandler',
		xyz:'xyzHandler'
	};


	$("button#logout").click(function(){
		service.logout();
	});

});