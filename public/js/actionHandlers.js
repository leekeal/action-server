/****  Event Handlers  ***/


function dragHandler(data,from){
    $(".user#"+from+' span.glyphicon').animate({color:'red',opacity:'1'},0.01);
	$("#example").css("top",data.top).css("left",data.left);
    $(".user#"+from+' span.glyphicon').animate({color:'black',opacity:'1'},0.01);


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