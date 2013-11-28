// $(function () {
//     /////////////////////////////////////////////////////////

//     $('#responseWS').html('start');

//     var i = 0;
//     var domain = "localhost";
//     var conn = new WebSocket('ws://' + domain + ':19028/getSampleDataWS');
//     conn.binaryType = 'arraybuffer';
//     conn.onopen = function () {
//         conn.send('hello web socket server');
//     };

//     conn.onerror = function (error) {
//         alert('error');
//     };

//     conn.onmessage = function (e) {

//         var msg = e.data;
//         if (typeof e.data === "string") {
//             $('#responseWS').html(msg);
//         }
//         if (e.data instanceof ArrayBuffer) {

//             var dataview = new DataView(msg);
//             var val = "wiimote id: " + dataview.getInt8(0) + "</br>";
//             val += "Y :" + Math.floor(dataview.getFloat32(8)) + "</br>";
//             val += "X :" + Math.floor(dataview.getFloat32(4)) + "</br>";
//             val += "Z :" + Math.floor(dataview.getFloat32(12)) + "</br>";


//             $('#responseWS').html(val);
//             var x = dataview.getFloat32(4);
//             var y = dataview.getFloat32(8);
//             var z = dataview.getFloat32(12);



//             service.putAction('xyz', { x: x, y: y, z: z });
//             var sum = hantei_test(x, y, z);
//             if (sum > 30) {
//                 if (z > 3) {
//                     muse = $('select[name="selectname"]').val();
//                     play(this);window.alert(muse);
                 
//                     service.autoAction('sound', muse)
//                 }
//             }
//         }
//     };

//     conn.onclose = function () {
//         alert('close websocket');
//     };


//     function hantei_test(x, y, z) {
//         //        var sum=input[0]*1+input[1]*2+input[2]*3+input[4]*2+inpit[5]*1;
//         var sum = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);

//         return sum;
//     }
//     ///////////////////////////////////////////////////////////////////



//     $("#color").click(function () {
//         console.log("click color");
//         service.autoAction('color', "red");
//     });
//     $("#next").click(function () {
//         console.log("click");
//         service.autoAction('next', null);
//     });
//     $("#left").click(function () {
//         console.log("click");
//         service.autoAction('left', null);
//     });
//     $("#right").click(function () {
//         console.log("click");
//         service.autoAction('right', null);
//     });
// });

