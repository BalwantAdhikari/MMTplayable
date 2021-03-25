export default class Align
{
	static scaleToGameW(obj,per)
	{
		obj.displayWidth=window.innerWidth*per;
		obj.scaleY=obj.scaleX;
	}
	static centerH(obj)
	{
		obj.x=window.innerWidth/2-obj.displayWidth/2;
	}
	static centerV(obj)
	{
		obj.y=window.innerHeight/2-obj.displayHeight/2;
	}
	static center2(obj)
	{
		obj.x=window.innerWidth/2-obj.displayWidth/2;
		obj.y=window.innerHeight/2-obj.displayHeight/2;
	}
	static center(obj)
	{
		obj.x=window.innerWidth/2;
		obj.y=window.innerHeight/2;
	}
}