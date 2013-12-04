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
			dom += '<li fileName="' +recordName+'" class="list-group-item">'+recordName+' <span id="playRecord" onclick="readRecord(event)" class="glyphicon glyphicon-play"></span></li>' 
		});
		$("#recordList").html(dom);
	}
	else if(data.action == 'read'){

		var worker = new Worker('js/record-worker.js');
		worker.postMessage(data);
		
		worker.addEventListener('message', function(e) {
			if (e.data == 'end') {
				$("#recordList li span").each(function(){
					$(this).removeClass('glyphicon-stop');
					$(this).addClass('glyphicon-play');
				});
			}
			else{
				service.runAction(e.data);//actionを実行
			}
        }, false);
	};
}

function readRecord(event){
    $e = $(event.target);
    $li = $e.offsetParent();
    var fileName = $li.attr('fileName');
    service.record('read',fileName);
    $e.removeClass('glyphicon-play');
    $e.addClass('glyphicon-stop');
}

