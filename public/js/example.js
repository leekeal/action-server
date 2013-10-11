$(document).ready(function(){
	service = new service();
	service.actionHandlers = {
		so:'soundHandler',
		im:'imageHandler',
		bg:'changeBackgroundColor',
		size:'sizeHandler'
	};
	/*
	service.putAction('so','hello world');
	service.putAction('im','my image');
	service.putAction('bg','green');
	service.putAction('size','100');
	*/
});

function soundHandler(data){
	console.log('音楽を'+data+'に変更した');
}
function imageHandler(data){
	console.log('画像を'+data+'に変更した');
}
function sizeHandler(data){
	$("#bg-test").height(data);
}
function changeBackgroundColor(data){
	$("#bg-test").css("background-color",data);
}