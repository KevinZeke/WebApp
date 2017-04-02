// 柱图组件
var H5componentBar=function( name,cfg )
{
	var component=new H5componentBase(name,cfg);

	$.each(cfg.data,function(index, val) {
	    var name = $("<div class='name'></div>");
	    var line = $("<div class='line'></div>");
	    var per  = $('<div class="per"></div>');
	    var rate = $('<div class="rate"></div>');	
	    name.text(val[0]);	
	    var width = val[1]*100+'%';
	    per.text(width);
	    // 以bg来完成生长动画
	    var bgColor='';
	    if(val[2])
	    {
	    	bgColor=" style='background-color:"+ val[2] +";'";
	    }
	    rate.html('<div class="bg"'+bgColor+'></div>').width(width);
	    

	    
	    line.append(name).append(rate).append(per).appendTo(component);	
	});



	return component;
}