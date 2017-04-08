//折线图组件
var H5componentRing=function( name,cfg )
{
	var component=new H5componentBase(name,cfg);
	//画布层
	var w=cfg.width;
	var h=cfg.height;
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	const data_length = cfg.data.length;
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);
    
    //半径
	var r=w/2;
	var step=cfg.data.length;

	//计算多边形的顶点坐标
	//已知圆心坐标(x,y),半径r和角度deg
	//rad=(2*Math.PI/360)*(360/step)
	//a=x+Math.sin(rad)*r
	//b=y+Math.cos(rad)*r

	//绘制底层
	ctx.beginPath();
	ctx.fillStyle="#F0E3E3";
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();


    canvas=document.createElement('canvas');
    ctx=canvas.getContext('2d');
    canvas.width=ctx.width=w;
    canvas.height=ctx.height=h;
    component.append(canvas);
	//绘制数据层
	sAngle=1.5*Math.PI;
	aAngle=2*Math.PI;
    
		function draw(per)
		{
			ctx.clearRect(0,0,w,h);
			ctx.beginPath();
			ctx.moveTo(r,r);
		    ctx.fillStyle=cfg.data[2]||'#DB7B49';
			ctx.arc(r,r,r,sAngle,sAngle+cfg.data[1]*aAngle*per);
			ctx.fill();
			//遮罩层
			ctx.beginPath();
		    ctx.fillStyle="white";
		    ctx.arc(r,r,r*0.8,0,2*Math.PI);
		    ctx.fill();

		    if(per>=1)
		    {
		    	component.find('.text').css('opacity',1);
		    }
		    else if(per<=0)
		    {
		    	component.find('.text').css('opacity',0);
		    }

		}
		draw(0);

		var text=$('<div class="text">'+cfg.data[0]+'</div>');
		var rate=$('<div class="rate">'+parseInt(cfg.data[1]*100)+'%</div>');
		rate.appendTo(text);
		if(cfg.data[2])
		{
			text.css('color',cfg.data[2]);
		}
		text.css('opacity',0);
		text.appendTo(component);


          

		component.on('onload',function()
		{
			var per=0;
		    var timer = setInterval(function()
		    {
		    	if(per>=1)clearInterval(timer);
		    	draw(per);
		    	per+=0.05;
		    },30);
		})

		component.on('onleave',function()
		{
			var per=1;
		    var timer = setInterval(function()
		    {
		    	if(per<=0)clearInterval(timer);
		    	draw(per);
		    	per-=0.05;
		    },30);
		})

	return component;
}