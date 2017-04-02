//折线图组件
var H5componentRadar=function( name,cfg )
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
    
    for(var s=10;s>0;s--)
    {
    	ctx.beginPath();
    	ctx.fillStyle=s%2?'#FFFFFF':'#99c0ff';
		for(var i=0;i<step;i++)
		{
			var rad=(2*Math.PI/360)*(360/step)*i;
			var x=r+Math.sin(rad)*r*(s/10);
			var y=r+Math.cos(rad)*r*(s/10);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fill();
    }

    //绘制伞骨
    for(var i=0;i<step;i++)
		{
			ctx.moveTo(r,r);
			var rad=(2*Math.PI/360)*(360/step)*i;
			var x=r+Math.sin(rad)*r;
			var y=r+Math.cos(rad)*r;
			ctx.lineTo(x,y);

			//项目文字
			var text=$('<div class="text"></div>');
			text.text(cfg.data[i][0]);
			text.appendTo(component);
			if(x>w/2)
			{
				text.css('left',x/2-5);
			}
			else
			{
				text.css('right', (w-x)/2-5);
			}
			if(y>h/2)
			{
				text.css('top', y/2-4);
			}
			else
			{
				text.css('bottom', (h-y)/2-4);
			}
			//添加不同的延时动画
			text.css('transition','all .5s '+i*.1+'s').css('opacity',0);
			if(cfg.data[i][2])
			{
				text.css('color',cfg.data[i][2]);
			}
		}
		ctx.stroke();

	//绘制数据层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);




    component.append(canvas);
		function draw(per)
		{
			if(per>=1)
			{
				component.find('.text').css('opacity',1);
			}
			else if(per<=0)
			{
				component.find('.text').css('opacity',0);
			}

				
			    ctx.beginPath();
			    ctx.strokeStyle="#423BE4";
			    ctx.fillStyle='rgba(124, 91, 206,.5)';
				for(var i=0;i<step;i++)
				{   
					var item=cfg.data[i];
					var rad=(2*Math.PI/360)*(360/step)*i;
					var x=r+Math.sin(rad)*r*item[1]*per;
					var y=r+Math.cos(rad)*r*item[1]*per;
					ctx.lineTo(x,y);
				}
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				ctx.beginPath();
				ctx.fillStyle="#ED3232";
				for(var i=0;i<step;i++)
				{   
					
					var item=cfg.data[i];
					var rad=(2*Math.PI/360)*(360/step)*i;
					var x=r+Math.sin(rad)*r*item[1]*per;
					var y=r+Math.cos(rad)*r*item[1]*per;
					ctx.arc(x,y,5,0,2*Math.PI);
					ctx.closePath();
			        ctx.fill();
			   	}

		}
            
        draw(0);


		component.on('onload',function()
		{
			var per=0;
		    var timer = setInterval(function()
		    {
		    	if(per>=1)clearInterval(timer);
		    	ctx.clearRect(0,0,w,h);
		    	draw(per);
		    	per+=0.05;
		    },30)
		})

		component.on('onleave',function()
		{
			var per=1;
		    var timer = setInterval(function()
		    {
		    	if(per<=0)clearInterval(timer);
		    	ctx.clearRect(0,0,w,h);
		    	draw(per);
		    	per-=0.05;
		    },30)
		})

	return component;
}