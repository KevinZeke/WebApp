// 图表组件
var H5componentPoint=function( name,cfg )
{
	var point,
		name,
		rate,
	    per;
	var component=new H5componentBase(name,cfg);
	var base=cfg.data[0][1];  //以第一个数据的比例大小为100%
	//输出每个point
	$.each(cfg.data, function(index, val) {
		point=$('<div class="point point_'+index+'"></div>');
		per=(val[1]/base*100)+'%';
		name=$('<div class="name">'+val[0]+'</div>');
		rate=$('<div class="rate">'+val[1]+'</div>');
		name.append(rate).appendTo(point);
		point.width(per).height(per);
		if(val[2])
		{
			point.css('backgroundColor',val[2]);
		}
		//注意0也是false
		if(val[3]!==undefined && val[4]!==undefined)
		{
			point.data({'left':val[3],'top':val[4]});
		}
		point.appendTo(component);
	});
	component.on('onload',function()
	{
		$component_point=component.find('.point');
		$component_point.each(function(index, el) {
		var $this=$(this);
		$this.animate({top:$this.data('top'),left:$this.data('left')});
	});
	})

	component.on('onleave',function()
	{
		$component_point=component.find('.point');
		$component_point.animate({'top':0,'left':0});
	})
	return component;

}