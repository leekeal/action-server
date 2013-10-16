/****  Event Handlers  ***/


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

