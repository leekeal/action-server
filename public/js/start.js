    $(function () {

    //   $('#responseWS').html('start');

    //   var i = 0;
    //   var domain = "localhost";
    //   var conn = new WebSocket('ws://' + domain + ':19028/getSampleDataWS');
    //   conn.binaryType = 'arraybuffer';
    //   conn.onopen = function () {
    //     conn.send('hello web socket server');
    // };

    // conn.onerror = function (error) {
    //     alert('error');
    // };

    // conn.onmessage = function (e) {

    //     var msg = e.data;
    //     if (typeof e.data === "string") {
    //         $('#responseWS').html(msg);
    //     }
    //     if (e.data instanceof ArrayBuffer) {

    //         var dataview = new DataView(msg);
    //         var val = "wiimote id: " + dataview.getInt8(0) + "</br>";
    //         val += "Y :" + Math.floor(dataview.getFloat32(8)) + "</br>";
    //         val += "X :" + Math.floor(dataview.getFloat32(4)) + "</br>";
    //         val += "Z :" + Math.floor(dataview.getFloat32(12)) + "</br>";

    //         $('#responseWS').html(val);
    //         var x = dataview.getFloat32(4);
    //         var y = dataview.getFloat32(8);
    //         var z = dataview.getFloat32(12);

    //         service.putAction('xyz',{x:x,y:y,z:z});

    //     }
    // };

    // conn.onclose = function () {
    //     alert('close websocket');
    // };
});