$(function () {
	var sp = 0;

    var sptotal = 0; ;
    var spave = 0;
    var sum;
    var speed = 0;
    var ireturn;
    var spsho = 0;
    var l=0;
    var k=0;
    /////////////////////////////////////////////////////////

    $('#responseWS').html('start');

    var i = 0;
    var domain = "localhost";
    var conn = new WebSocket('ws://' + domain + ':19028/getSampleDataWS');
    conn.binaryType = 'arraybuffer';
    conn.onopen = function () {
        conn.send('hello web socket server');
        console.log(12356);
    };

    conn.onerror = function (error) {
        alert("wii isn't connected");
    };

    conn.onmessage = function (e) {

        var msg = e.data;
        if (typeof e.data === "string") {
            $('#responseWS').html(msg);
        }
        if (e.data instanceof ArrayBuffer) {

            var dataview = new DataView(msg);
            var val = "wiimote id: " + dataview.getInt8(0) + "</br>";
            val += "Y :" + Math.floor(dataview.getFloat32(8)) + "</br>";
            val += "X :" + Math.floor(dataview.getFloat32(4)) + "</br>";
            val += "Z :" + Math.floor(dataview.getFloat32(12)) + "</br>";

            $('#responseWS').html(val);

            var x = dataview.getFloat32(4);
            var y = dataview.getFloat32(8);
            var z = dataview.getFloat32(12);

            // matching(x, y, z);
            service.putAction('xyz', { x: x, y: y, z: z });
            sum = hantei_test(x, y, z);
            //            document.write(sum + " ");
            val += sum + "</br>";
            //                        kasokudo_print(sum);
            spped = kasokudo(sum);

            //            spsho = shousuu(speed);

            //            kasokudo_print(speed);

            console.log(123);
            console.log(val);
            if (sum > 5) {

                if (z > 3) {
                    muse = $('select[name="selectname"]').val();
                    //                    play(this);window.alert(muse);

                    service.autoAction('sound', muse)
                    //            }
                    //             else if (y < 0) {
                    //                service.autoaction('up', null);
                } else if (x > 1) {
                    service.autoAction('right', null);

                    fallRight();
                }
                else if (x < -1) {
                    service.autoAction('left', null);
                    fallLeft();
                }


            }

        }
    };

    conn.onclose = function () {
        console.log('close websocket');
    };


    function hantei_test(x, y, z) {
        //        var sum=input[0]*1+input[1]*2+input[2]*3+input[4]*2+inpit[5]*1;
        var sum1 = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);

        return sum1;
    }
    function kasokudo(sum) {
        var spArray = new Array(100);
        if (sp < spArray.length) {

            spArray[sp] = sum;
            sptotal += sum;

            sp++;
            if (sp == spArray.length) {
                spave = sptotal / sp;
                sp = 0;
                sptotal = 0;

                spave *= 100;
                spave = Math.floor(spave);
                spave /= 100;

                ireturn = spave;
                kasokudo_print(ireturn);

                return ireturn;

            }

            //                        $('#responseWS2').html(sp);            
        }

    }

});

