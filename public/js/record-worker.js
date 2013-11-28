self.addEventListener('message', function(e) { 
	var data = e.data;
	var startTime = new Date().getTime();
	var firstActionTime = data.record[0].runTime;

	for (i in data.record){
		if (i == 0) {
			console.log(i);
		}
		else{
			while(1){
				nowTime = new Date().getTime();
				if (nowTime - startTime >= data.record[i].runTime - firstActionTime) {
		        		console.log(i);//actionのidを表示する。
		        		self.postMessage(data.record[i]);
		        		break;
		        }
		    }
		}
	}

}, false);