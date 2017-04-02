// 柱图组件
var H5componentBar_v=function( name,cfg )
{
	var component=new H5componentBase(name,cfg);

	$.each(cfg.data, function(index, val) {
		//柱状图整体
		var line=$('<div class="line"></div>');
		//柱状图名字
		var name=$('<div class="name"></div>');
		//柱状图柱体
		var rate=$('<div class="rate"></div>');
		//值
		var per=$('<div class="per"></div>');

		var height=val[1]*100+'%';
		var bgColor='';
		if(val[2])
		{
			bgColor="style='background-color:" + val[2] + "'";
		}

		per.appendTo(line).text(height);
		rate.appendTo(line);
		name.text(val[0]).appendTo(line);
		rate.height(height).html('<div class="rate_bg" '+bgColor+'></div>');
		line.appendTo(component).width(100/cfg.data.length+'%');		 
	});
	

	return component;
}