var imagePoolTotal = 0;
$(document).ready(function(){
	// $('#imagePool').collapse()
new imagePool('デフォルト','default',12);

new imagePool('12月18日','20131218',11);
new imagePool('風景','landscape',10);
// new imagePool('2013年12月','2013年12月');


})


function imagePool(title,folder,total){
	selt = this;
	this.total = total;
	this.folder = folder;
	this.title = title;

	pool = this.createPool();
	dom = this.createView(pool);
	$("#accordion").append(dom);
	$("#imagePool-0").addClass("in");
}

imagePool.prototype.createView = function(pool){
	var heading = "<div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-toggle='collapse' data-parent='#accordion' href='#imagePool-"+imagePoolTotal+"'>"+this.title+"</a></h4></div>";

	var collapse = "<div id='imagePool-"+imagePoolTotal+++"' class='panel-collapse collapse'> <div class='panel-body'>"+ pool +"</div> </div>";
	var panel = "<div class='panel panel-default'>"+heading + collapse+"</div>";
	return panel;
}

imagePool.prototype.createPool = function(){
	var images='';
	while(this.total){
		images+= "<div class='col-md-3'> <a href='#' class='thumbnail'> <img style='height:73px;' src='imagepool/"+this.folder+"/"+ this.total-- +".jpg'> </a> </div> "
	}
	pool = "<div class='row'>"+ images +"</div>";
	return pool;
}

