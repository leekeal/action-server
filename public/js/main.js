
<script type="text/javascript">
//音再生
            var SOUND_PATH = "./sound/";

function ButtonClick(obj)
{

var muse = $('select[name="formname"]').val();
//    obj.text1.value = tako;
                    var file_path = SOUND_PATH + muse + '.' + 'mp3';
                // Audio エレメントを生成
                var audio = new Audio(file_path);
                // 再生
                audio.play();
}


// forked from kaneyan's "buta_rakka" http://jsdo.it/kaneyan/qnBc
    var imge = new Image();
    var bg = new Image();
    var imgArray = new Array(25);
    var arraybg = new Array(55);
    var init; 
    var x;
    var y; 
    var j = 0;
    var al=1;



//window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),


      // アニメーションの始点
//      basePos = {
//        x: Math.floor(Math.random() *1000)/2,
//        y: Math.floor(Math.random()*1000)/2
//      },
      // フレームレート
      rate = 30;
      var time = 70;//1000 / rate;

      window.onload = function () {
//      set();
for(i=0;i<57;i++){
var x;
x=i+1;
  arraybg[i]="backimg/img/"+String(x)+".jpg";
//  $('#responseWS9').html(arraybg[i]);

  }
          	image();

//          fallRight();
      }
//    
//function set(){
//imge.src = "anime/kinkaku4.jpg";
//	var w = canvas.width;
//	var h = canvas.height;
//	context.drawImage(imge, 0, 0, w, h);
//    image();
//}

function image(){

bg.src=arraybg[0];
    for(i = 0; i < imgArray.length; i++) {
  
        var img = document.createElement("IMG");
//        if(i % 2) {
            img.src = "anime/001.png"; 　<!--　Ｎｏ１好きな画像名に変更 -->
//            img.width = 30; img.height = 30;
//        }
//        else {
//            img.src = "anime/001.png";　　<!--　Ｎｏ２好きな画像名に変更 -->
//            img.width = 30; img.height = 30;
//        }
<!-- 初期位置 -->
        img.style.position = "absolute";
<!-- 左右ばらつき -->
        img.style.left =Math.floor(Math.random() *1000)/2;
<!-- 上下ばらつき -->
        img.style.top = Math.floor(Math.random()*1000)/2;
        
//        document.body.appendChild(img);
        imgArray[i] = img;
    }

    init=setTimeout("initImage()", 70);　　　<!--　 のスピードを変える　（７０）を１００とか　　-->

}

function back(){
ctx.restore();
//bg.src=arraybg[j];
//j--;
//if(j==0)
//j=56;

}
function next(){
ctx.save();
bg.src=arraybg[j];
j++;
if(j==57)
j=0;
//j++;
//if(j==1)
//bg.src="backimg/summer.jpg";
//else if(j==2)
//bg.src="backimg/autam.jpg";
//else if(j==3)
//bg.src="backimg/kinkaku4.jpg";
//else if(j==0 || j==4)
//bg.src="backimg/spring.jpg";

//if(j>3)
//j=0;
}
function initImage() {    
    // canvasに描かれている内容をリセットする
    clearTimeout(init);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = al;
    ctx.drawImage(bg,0, 0, canvas.width, canvas.height);


    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
         x = parseInt(img.style.left);
         y = parseInt(img.style.top);
    y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
      
    if (y > canvas.height) {
        y = -30;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
    x += Math.floor(Math.sin(y/40)*2);
    if (x > canvas.width) {
           y =-30;
         x=Math.floor(Math.random() *1000)/2;
        }
    }
    // 次の始点
    img.style.top = y+3;
//    img.style.left= x;
      }   
    // 無名関数を繰り返して実行するタイマー
    // 1000 / rateミリ秒ごとに実行する
    
   init= setTimeout("initImage()", 70);
  }

  function fallLeaves() {    
clearTimeout(init);
    // canvasに描かれている内容をリセットする
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = al;
    ctx.drawImage(bg,0, 0, canvas.width, canvas.height);
    

    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
         x = parseInt(img.style.left);
         y = parseInt(img.style.top);
y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
    if (y > canvas.height) {
        y = -30;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
    x += Math.floor(Math.sin(y/40)*2);
    if (x > canvas.width) {
           y =-30;
         x=Math.floor(Math.random() *1000)/2;
        }
    }
    // 次の始点
    img.style.top = y+3;
    img.style.left= x;
      }   
    // 無名関数を繰り返して実行するタイマー
    // 1000 / rateミリ秒ごとに実行する
    
   init= setTimeout("fallLeaves()", 70);
  }
  
  function up() {    
clearTimeout(init);
    // canvasに描かれている内容をリセットする
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.globalAlpha = al;
    ctx.drawImage(bg,0, 0, canvas.width, canvas.height);


    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
         x = parseInt(img.style.left);
         y = parseInt(img.style.top);
//y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
      
    if (y <-30) {
        y =canvas.height;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
    x += Math.floor(Math.sin(y/40)*2);
    if (x > canvas.width) {
           y =530;
         x=Math.floor(Math.random() *1000)/2;
        }
    }
    // 次の始点
    img.style.top = y-3;
//    img.style.left= x;
      }   
   init= setTimeout("up()", 70);
  }

   function upLeaves() {    
clearTimeout(init);
    // canvasに描かれている内容をリセットする
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = al;
    ctx.drawImage(bg,0, 0, canvas.width, canvas.height);
    

    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
         x = parseInt(img.style.left);
         y = parseInt(img.style.top);
//y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
     if (y <-30) {
        y = canvas.height;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
    x += Math.floor(Math.sin(y/40)*2);
    if (x > canvas.width) {
           y =530;
         x=Math.floor(Math.random() *1000)/2;
        }
        }
    // 次の始点
    img.style.top = y-3;
    img.style.left= x;
      }   
    // 無名関数を繰り返して実行するタイマー
    // 1000 / rateミリ秒ごとに実行する
    
   init= setTimeout("upLeaves()", 70);
  }
  function fallRight() {
//            alert('animation end');

//bg.src = "anime/autam.jpg";
 clearTimeout(init);
    // canvasに描かれている内容をリセットする
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = al;
    //背景の描画
    ctx.drawImage(bg,0, 0, canvas.width, canvas.height);

    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
        x = parseInt(img.style.left);
        y = parseInt(img.style.top);
y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
    if (y > canvas.height) {
        y = -30;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
//    x += Math.floor(Math.sin(y/40)*2);
    if (x > canvas.width) {
           y =-30;
         x=Math.floor(Math.random() *1000)/2;
        }
    }
    // 次の始点
    img.style.top = y+3;
    img.style.left= x+3;
      }   
      // 無名関数を繰り返して実行するタイマー
      // 1000 / rateミリ秒ごとに実行する
      init = setTimeout("fallRight()", time);
};

function fallLeft() {

//bg.src = "anime/kinkaku4.jpg";
   clearTimeout(init);
    // canvasに描かれている内容をリセットする
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = al;
            ctx.drawImage(bg,0, 0, canvas.width, canvas.height);

    for(i=0;i<imgArray.length;i++){
    var img = imgArray[i];
        x = parseInt(img.style.left);
        y = parseInt(img.style.top);
y += 2 + Math.floor(Math.random() * 3);
      // 画像の描画
      
    ctx.drawImage(img,x, y,30,30);
    if(i%3==0)
    ctx.globalAlpha = 1;
    else if(i%2==0)
    ctx.globalAlpha = .2;
    else
    ctx.globalAlpha=.4;
    if (y > canvas.height) {
        y = -30;
         x=Math.floor(Math.random() *1000)/2;
    } 
    else {
//    x += Math.floor(Math.sin(y/40)*2);
    if (x < -30) {
           y =-30;
         x=Math.floor(Math.random() *1000)/2;
        }
    }
    // 次の始点
    img.style.top = y+3;
    img.style.left= x-3;
      }   
    // 無名関数を繰り返して実行するタイマー
    // 1000 / rateミリ秒ごとに実行する
    init = setTimeout("fallLeft()", time);
};
function stop(){

 clearTimeout(init);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg,0, 0, canvas.width, canvas.height);
}

function ButtonClick2(obj){

      for(i = 0; i < imgArray.length; i++) {
    
   var tako;
    tako = obj.selectname2.options[obj.selectname2.selectedIndex].value; 
        var img2 = document.createElement("IMG");
//        if(i % 2) {
            img2.src = tako; 　<!--　Ｎｏ１好きな画像名に変更 -->
            img2.width = 30; img2.height = 30;
//        }
//        else {
//            img.src = "anime/001.png";　　<!--　Ｎｏ２好きな画像名に変更 -->
//            img.width = 30; img.height = 30;
//        }
//<!-- 初期位置 -->

//        img.style.position = "absolute";
//<!-- 左右ばらつき -->
        img2.style.left =parseInt(Math.floor(Math.random()*1000)/2);
//<!-- 上下ばらつき -->
        img2.style.top = parseInt(Math.floor(Math.random()*1000)/2);
        
//        document.body.appendChild(img);
        imgArray[i] = img2;
    } 
//    return imgArray;
//    init=setTimeout("fallLeaves()", 70);　
}
function ButtonClick3(obj){
  
   var tako;
    tako = obj.selectname3.options[obj.selectname3.selectedIndex].value; 
        al=tako;

}
$(function () {
   	jQuery( '#sortable' ) . sortable();
	jQuery( '#sortable' ) . disableSelection();
	jQuery( '#submitSortable' ) . click( function() {
    l=0;
		var itemNames = '';
		var itemIDs = '';
		jQuery( '#sortable li' ) . map( function() {
        
        
			itemNames +=  jQuery( this ) . attr("id")+ '\n';
           
        arraybg[l]='backimg/img/'+ jQuery( this ) . attr("id")+'.jpg';
        $('#responseWS9').html(arraybg[l]+'\n');
        l++;
        
//			itemIDs += jQuery( this ) .children( 'span' ) . text() + ',';
		} );
		if( confirm( '【変更しますか？】' ) ){
//			location . href = '#itemIDs=' + itemIDs;
            j=0;
                    
		}
	} );
} );var l=0;

</script> 