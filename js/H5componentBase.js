
var H5componentBase=function( name,cfg )
{
	var cfg = cfg || {};
	var id=('h5_c_'+Math.random()).replace('.','_');
	console.log(cfg);
	var cls_name=" h5_component_"+cfg.type;
	var component=$('<div class="h5_component '+cls_name+' h5_component_name_'+name+'" id='+id+'>'+(cfg.text?cfg.text:'')+'</div>');
	cfg.width  && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css    && component.css(cfg.css);
	cfg.bg     && component.css('background-image','url('+ cfg.bg +')');
	var $component_point;
	if(cfg.center===true)
	{
		component.css({
			marginLeft:(-cfg.width/4)+'px',
			left:'50%'
		})
	}
	component.on('onleave',function()
	{
		component.addClass(cls_name+'_leave').removeClass(cls_name+'_load');
		cfg.animateOut && component.animate(cfg.animateOut,500);
		return false; //避免dom的循环传播
	})
	component.on('onload',function()
	{
		component.addClass(cls_name+'_load').removeClass(cls_name+"_leave");
		cfg.animateIn && component.animate(cfg.animateIn , 500);
		
		return false;
	})
 	return component;
}