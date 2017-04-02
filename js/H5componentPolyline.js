//折线图组件
var H5componentPolyline=function( name,cfg )
{
	var component=new H5componentBase(name,cfg);
	//绘制网格线
	var w=cfg.width;
	var h=cfg.height;
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	const data_length = cfg.data.length;
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);

    //水平网格线
    var step=10;
    var y,x;
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.strokeStyle="#AAAAAA";
    for(var i=0;i<step+1;i++)
    {
    	y=i*cfg.height/step;
    	ctx.moveTo(0,y);
    	ctx.lineTo(w,y);
    }
    //垂直网格线
    step=data_length+1;
    var text_w=w/step/2;
    for(var i=0;i<step+1;i++)
    {
    	x=i*cfg.width/step;
    	ctx.moveTo(x,0);
    	ctx.lineTo(x,h);

    	
    	if (cfg.data[i])
    	{
    		var text=$('<div class="text"></div>');
	    	text.text(cfg.data[i][0]);
	    	text.appendTo(component);
	    	text.css({
	    		'left' :text_w*(i+1)-text_w/2,
	    		'width':text_w,
	    		'top':h/2
	    	})
        }
       
    }
    ctx.stroke();

    //绘制折线图.另起一个画布
    var canvas=document.createElement('canvas');
    var ctx=canvas.getContext('2d');
    canvas.width=ctx.width= w;
    canvas.height=ctx.height= h;

    component.append(canvas);
    
/*    var ny=[],
        arr=[];
    for(var j=0;j<data_length;j++)
    {
    	ny[j]=h;
    	arr[j]=h-cfg.data[j][1]*h;
    }
    var timer=setInterval(function()
    	{
    		ctx.clearRect(0,0,w,h);
		    ctx.beginPath();
		    ctx.lineWidth=3;

		    ctx.strokeStyle="#E76868";
		    var radius=10;//圆半径
		    for(var i=0;i<data_length;i++)
		    {
		    	x=w/(data_length+1)*(i+1);
		    	y=h-cfg.data[i][1]*h;
		    	//起笔位置重置到圆的右面
		    	if(ny[i]!=y)
		    	{
		    		ny[i]=ny[i]-4;
		    	}
		    	ctx.moveTo(x+10,ny[i]);
		    	ctx.arc(x,ny[i],radius,0,2*Math.PI,false);
		    	ctx.fillStyle=cfg.data[i][2]?cfg.data[i][2]:'#5858BA';
		    	ctx.fillText(cfg.data[i][1]*100+'%',x,y-2*radius);
		    }
		    //重新起笔画线
		    ctx.moveTo(w/(data_length+1),ny[0]);
		    for(var i=0;i<data_length;i++)
		    {
		    	x=w/(data_length+1)*(i+1);
		    	y=h-cfg.data[i][1]*h;
		    	ctx.lineTo(x,ny[i]);
		    	
		    }
		    ctx.stroke();
		    if(Math.min.apply(null,ny)==Math.min.apply(null,arr))
		    {
		    	clearInterval(timer);
		    }
		    
    	},30)*/



		function draw(per)
		{
		    ctx.beginPath();
		    ctx.lineWidth=3;

		    ctx.strokeStyle="#E76868";
		    var radius=10;//圆半径
		    for(var i=0;i<data_length;i++)
		    {
		    	x=w/(data_length+1)*(i+1);
		    	y=h-cfg.data[i][1]*h*per;
		    	//起笔位置重置到圆的右面
		    	ctx.moveTo(x+10,y);
		    	ctx.arc(x,y,radius,0,2*Math.PI,false);
		    	ctx.fillStyle=cfg.data[i][2]?cfg.data[i][2]:'#5858BA';
		    	ctx.fillText(cfg.data[i][1]*100+'%',x,y-2*radius);
		    }
		    //重新起笔画线
		    ctx.moveTo(w/(data_length+1),h-cfg.data[0][1]*h*per);
		    for(var i=0;i<data_length;i++)
		    {
		    	x=w/(data_length+1)*(i+1);
		    	y=h-cfg.data[i][1]*h*per;
		    	ctx.lineTo(x,y);
		    }
		    ctx.stroke();
		    ctx.strokeStyle="rgba(0,0,0,0)";
		    //绘制阴影
		    ctx.lineTo(x,h);
		    ctx.lineTo(w/(data_length+1),h);
		    ctx.lineTo(w/(data_length+1),h-cfg.data[0][1]*h);
		    ctx.fillStyle='rgba(124, 91, 206,.2)';
		    ctx.fill();
		    ctx.stroke();
		}
            
        draw(0);


		component.on('onload',function()
		{
			// 折线图生长动画
			//var _this=$(this);
			var per=0;
			//if(timer)clearInterval(timer);
		    var timer = setInterval(function()
		    {
		    	if(per>=1)clearInterval(timer);
		    	ctx.clearRect(0,0,w,h);
		    	draw(per);
		    	/*_this.find('.text').css('opacity',per);*//*项目名称渐隐渐现改为css完成*/
		    	per+=0.05;
		    },30)
		})

		component.on('onleave',function()
		{
			// 折线图生长动画
			//var _this=$(this);
			var per=1;
			//if(timer)clearInterval(timer);
		    var timer = setInterval(function()
		    {
		    	if(per<=0)clearInterval(timer);
		    	ctx.clearRect(0,0,w,h);
		    	draw(per);
		        /*_this.find('.text').css('opacity',per);*/
		    	per-=0.05;
		    },30)
		})

	return component;
}