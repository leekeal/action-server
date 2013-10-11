$(document).ready(function(){
	service = new service();
	service.actionHandlers = {
		so:'soundHandler',
		im:'imageHandler'
	};

	service.putAction('so','hello world');
	service.putAction('im','my image');

});




function soundHandler(data){
	console.log(data);
}
function imageHandler(data){
	console.log(data);
}