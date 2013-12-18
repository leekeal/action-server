/****  Event Handlers  ***/
var hit1=0;
function xyzHandler(data,from){
    console.log(from+'--->'+data);
    $('#responseWS').html('  x->'+data.x +'  y->'+ data.y + '  z-->'+data.z);
    div  = $("#example");

}
function rightHandler(){
    fallright();
}
function nextHandler() {
    bg.src = arraybg[j];
    j++;
    if (j == 57)
        j = 0;
}

function dragHandler(data,from){
    // $(".user#"+from+' span.glyphicon').animate({color:'red',opacity:'1'},0.01);
    $("#example").css("top",data.top).css("left",data.left);
    // $(".user#"+from+' span.glyphicon').animate({color:'black',opacity:'1'},0.01);

}

function hitHandler(){
//for (var i = 0; i < 177; i++){
//  document.write("<p>");

//  for (var j = 0; j < 3; j++){
//    document.write( yoko[i][j] + ",");
//  }

//  document.write("</p>");
//}



hit1++;

$('#responseWS3').html(hit1);
//document.write(hit1);

}
function soundHandler(sound) {
//    window.alert(sound);
muse = sound;
play(this);
}

function moveimgHandler(moveimg) {

  for(i = 0; i < imgArray.length; i++) {
//     window.alert(moveimg);
var anime=moveimg;
var mimg = document.createElement("IMG");
//        if(i % 2) {
    mimg.src = anime; 　<!--　Ｎｏ１好きな画像名に変更 -->
    mimg.width = 30; mimg.height = 30;
//        }
//        else {
//            img.src = "anime/001.png";　　<!--　Ｎｏ２好きな画像名に変更 -->
//            img.width = 30; img.height = 30;
//        }
//<!-- 初期位置 -->

//        img.style.position = "absolute";
//<!-- 左右ばらつき -->
mimg.style.left =parseInt(Math.floor(Math.random()*1000)/2);
//<!-- 上下ばらつき -->
mimg.style.top = parseInt(Math.floor(Math.random()*1000)/2);

//        document.body.appendChild(img);
imgArray[i] = mimg;


}
//    window.alert(tako);

//    return imgArray;
//    init=setTimeout("fallLeaves()", 70);　

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

function backimgHandler(backimg){
    console.log(backimg);
    for(var i=0;i<56;i++){
        arraybg[i]=backimg[i];
    }
    $( '#sortable' ).empty();
    for(var i=0;i<56;i++){
     
        $( '#sortable' ).append("<img src='"+backimg[i]+"'>")
    }
}

function colorHandler(color){
	$("#example").css("background-color",color);
}
function upHandler(){
    up();

}
function downHandler(){
	initImage();
}
function leftHandler(){

    fallLeft();
}
function rightHandler(){

	fallRight();
}
function yuraHandler(){
    fallLeaves();
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





