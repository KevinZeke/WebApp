var H5_loading=function(images,firstPage,nowPage)
{
	var item,img;
	var id=this.id;
	_this=this;
	if(this._images == undefined)
	{
		this._images=(images || [] ).length ;
		this.imgLoaded = 0;
		for(var i=0;i<images.length;i++)
		{
			item=images[i];
			img=new Image();
			img.onload=function()
			{
				_this.loader();
			}
			img.src=item;
		}

		return this;
	}
	else
	{
		this.imgLoaded++;
		$('.loading>.rate').text( parseInt(this.imgLoaded/this._images*100)+'%' );
		if(this.imgLoaded<this._images)
		{

			return this;
		}
	}

	this.el.fullpage({
		onLeave:function(index, nextIndex, direction)
		{
			//this指向正在离开的页面
			$(this).find('.h5_component').trigger('onleave');
		},
		afterLoad:function(anchorLink,index)
		{
			$(this).find('.h5_component').trigger('onload');
		}
		});
		this.page[0].find('.h5_component').trigger('onload');
		this.el.show();
		
		if(nowPage)
			$.fn.fullpage.moveTo( nowPage );
		return this;



	
}