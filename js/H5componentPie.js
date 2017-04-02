 //折线图组件
var H5componentPie=function( name,cfg )
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
    
    //加入一个底图层
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fillStyle='##D4CACA';
    ctx.fill();

	//绘制数据层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);

	
	var sAngle=1.5*Math.PI;//起始位置
	var eAngle=0;
	var aAngle=2*Math.PI; //100%的角度的圆结束位置
	for(var i=0;i<step;i++)
	{
		var item=cfg.data[i];
		eAngle=sAngle+aAngle*item[1];
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.fillStyle=item[2]||'rgb('+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+')';
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		sAngle=eAngle;


		//添加项目文本
		var text=$('<div class="text">'+item[0]+'</div>');
		var rate=$('<div class="rate">'+item[1]*100+'%</div>');
		rate.appendTo(text);
		text.appendTo(component);
		x=r+r*Math.sin(Math.PI/2 - sAngle);
		y=r+r*Math.cos(Math.PI/2 - sAngle);
		
		if(x>w/2)
		{
			text.css('left',x/2);
		}
		else
		{
			text.css('right',(w-x)/2);
		}

		if(y>h/2)
		{
			text.css('top',y/2-5);
		}
		else
		{
			text.css('bottom',(h-y)/2+6);
		}
		text.css('transition','all .5s '+i*.1+'s').css('opacity',0);
	}

    //加入一个蒙版层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);
	ctx.fillStyle='#D4CACA';


		function draw(per)
		{
			ctx.clearRect(0,0,w,h);
			ctx.beginPath();
			ctx.moveTo(r,r);
			if(per<=0)
			{
				ctx.arc(r,r,r,0,2*Math.PI);
				component.find('.text').css('opacity',0);

			}
			else
			{
				ctx.arc(r,r,r,1.5*Math.PI,1.5*Math.PI+2*Math.PI*per,true);

			}

			if(per>=1)
			{
				component.find('.text').css('opacity',1);
			}
			
			ctx.fill();

		}
            
       draw(0);


		component.on('onload',function()
		{
			var per=0;
		    for(i=0;i<100;i++)
		    {
		    	setTimeout(function()
		    	{
		    		per+=.01;
		    		draw(per);
		    	},i*10+500);
		    };
		})

		component.on('onleave',function()
		{
			var per=1;
		    for(i=0;i<100;i++)
		    {
		    	setTimeout(function()
		    	{
		    		per-=0.01;
		    		draw(per);
		    	},i*10);
		    };
		})

	return component;
}