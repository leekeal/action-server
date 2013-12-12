var SOUND_PATH = "./sound/";

    //             サポートされているファイル形式を取得
    //    var AUDIO_EXT = (function () {
    //        var audio = new Audio();
    //        var ext = "";
    //        if (audio.canPlayType("audio/ogg") == 'maybe') { ext = "ogg"; }
    //        else if (audio.canPlayType("audio/mp3") == 'maybe') { ext = "mp3"; }
    //        else if (audio.canPlayType("audio/wav") == 'maybe') { ext = "wav"; }

    //        return ext;
    //    })();

    // 確認
    //                alert( "このブラウザがサポートしている拡張子は '" + AUDIO_EXT + "'です." );

    // 再生
    var play = function (element) {
        // ファイル名を取得
        //        var name = document.formname.selectname.selectedIndex;

        //        var muse = "sample/uguisu";

        

        //                var name = element.getAttribute("name");
        //                alert(document.F1.S1.options[n].text);
        // パス + ファイル名 + サポートしている拡張子
        var file_path = SOUND_PATH + muse + '.' + "mp3";
        // Audio エレメントを生成
        var audio = new Audio(file_path);
        // 再生
        audio.play();
      };
      var muse;
    //    function ButtonClick(obj) {
    //        var muse;
    //        muse = obj.selectname.options[obj.selectname.selectedIndex].value;
    //        //    obj.text1.value = tako;
    //        var file_path = SOUND_PATH + muse + '.' + "mp3";
    //        // Audio エレメントを生成
    //        var audio = new Audio(file_path);
    //        // 再生
    //        audio.play();
      //    }
      var a = 0;
      function kasokudo_print(sum) {
//         $('#responseWS2').html(sum);
var tlarray = new Array(10);
tlarray[a] = sum; 
//          document.write(sum + " ");
document.getElementById('outputarea').value = document.getElementById('outputarea').value + tlarray[a] + ",";
a++; 

//          $('#responseWS2').html(tlarray);
//          document.writeln(tlarray );    
if (a == 10) {
  a = 0;
//              for (var i = 0; i < tlarray.length; i++) {

////                  document.getElementById('outputarea').value = document.getElementById('outputarea').value + tlarray[i] + ",";
//              }
document.getElementById('outputarea').value = document.getElementById('outputarea').value + "\n";

//                 $('#responseWS2').html(tlarray);
//              
}
if(sum>10)
 service.autoAction('hit', null);

}