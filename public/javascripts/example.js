$(document).ready(function(){
	service = new service();
	service.actionHandlers = {
		so:'soundHandler',
		im:'imageHandler'
	};

	//service.putAction('so','hello world');
	//service.putAction('im','my image');

});








function soundHandler(data){
	console.log('音楽を'+data+'に変更した');
}
function imageHandler(data){
	console.log('画像を'+data+'に変更した');
}