/****  Event Handlers  ***/
function xyzHandler(data,from){
    console.log(from+'--->'+data);
    $('#responseWS').html('  x->'+data.x +'  y->'+ data.y + '  z-->'+data.z);

    div  = $("#example");
    
}

function dragHandler(data,from){
    // $(".user#"+from+' span.glyphicon').animate({color:'red',opacity:'1'},0.01);
	$("#example").css("top",data.top).css("left",data.left);
    // $(".user#"+from+' span.glyphicon').animate({color:'black',opacity:'1'},0.01);


}

function animationHandler(data,form){
    start = function (){
        var div=$("#example");
        div.animate({top:data.top,left:data.left,opacity:'0.8'},500);
    }
    stop = function (){
        service.animationSwitch = 'stop';
    }
    window[data['switch']]();
}


function changeColorHandler(color){
	$("#example").css("background-color",color);
}


//オンラインイベントを処理する
function onlineEventHandler(users,user,self){
    if (self) {
        $("#username").text(user);
        for(user in users){
            $("#userList").append('<li class="list-group-item user" id = "'+user+'"><span class="glyphicon glyphicon-user"></span>'+user+'</li>');
        }
    }
    else{
        $("#userList").append('<li class="list-group-item user" id = "'+user+'"><span class="glyphicon glyphicon-user"></span>'+user+'</li>');
    }
    console.log(user+'⬆⬆⬆オンラインした');
}

//オフラインイベントを処理する
function offlineEventHandler(users,user){
    $(".user#"+user).remove();
    console.log(user+'⬇⬇⬇オフラインした');
}

function markActiveUserHandler(data){
    var userElement = $(".user#"+data.from+' .glyphicon');
    userElement.animate({color:'red',opacity:'1'},200);
    userElement.animate({color:'black',opacity:'1'},200);
    userElement.animate({color:'red',opacity:'1'},200);
    userElement.animate({color:'black',opacity:'1'},200);
    userElement.animate({color:'red',opacity:'1'},200);
    userElement.animate({color:'black',opacity:'1'},200);
    userElement.animate({color:'red',opacity:'1'},200);
    userElement.animate({color:'black',opacity:'1'},200);
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
        console.log(data.record);
    };
}

function readRecord(){
    var recordName = $("#recordList").val();
    service.record('read',recordName);
}

