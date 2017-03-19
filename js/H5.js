// 内容管理对象
var H5=function()
{
	this.id=("h5_"+Math.random()).replace('.','_');
	//H5为大容器
	this.el=$("<div class='h5' id="+this.id+"></div>");
	this.el.appendTo('body').hide();
	this.page=[];
	//添加页面
	this.addPage=function( name , text)
	{
		var page=$('<div class="h5_page section"></div>');
		if(name != undefined)
		{
			page.addClass('h5_page_'+name);
		};
		if(text != undefined)
		{
			page.text(text);
		};
		page.appendTo(this.el);
		this.page.push(page);

		return this;
	};
	this.addComponent=function(name , cfg)
	{
		var cfg= cfg || {};
		cfg=$.extend({type:'base'}, cfg);
		var component;
		//注意一个错误:slice方法返回的是一个子数组,所以page实际上是一个包含jq对象的数组,需要用[0]取出来
		//备忘:这里可能使用pop会更方便,考虑到page数组的其他功能,待查看
		var page=this.page.slice(-1)[0]; 
		switch(cfg.type)
		{
			case 'base':
			component=new H5componentBase(name,cfg);
			break;

			default:
		}
		page.append(component);
		return this;
		
	}
	//h5对象初始化呈现
	this.loader=function()
	{
		this.el.fullpage();
		this.el.show();
		return this;
	}
	return this;
}
