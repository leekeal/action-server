self.addEventListener('message', function(e) { 
	var data = e.data;
	var startTime = new Date().getTime();
	var firstActionTime = data.record[0].runTime;

	for (i in data.record){
		if (i == 0) {
			self.postMessage(data.record[i]);
		}
		else{
			while(1){
				nowTime = new Date().getTime();
				if (nowTime - startTime >= data.record[i].runTime - firstActionTime) {
					self.postMessage(data.record[i]);
					break;
				}
			}
		}
	}

	self.postMessage('end');

}, false);