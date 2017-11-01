/**
 * ...
 * @author Tyson Van Prooijen
 */

class Util
{
	
	public static inRange(value:number, range:number[]):boolean {
		return (value > range[0] && value < range[1]);
	}


	public static getRandomFromRange(min:number, max:number, decimals?:number):number {
		if (min == undefined || max == undefined) return -1;

		var n:number =  (Math.random() * (max-min)) + min,
			x:number = (decimals>0)? decimals*10 : 1;

		n = Math.floor(n*x)/x;
		// console.log('Util.getRandomFromRange('+ min +','+ max +') = '+ n);
		return n;
	}
	
	
	public static getOffsetRange(target:JQuery):number[] {
		var t:number;
		var h:number = target.outerHeight();
		
		if (target.offset()){
			t = target.offset().top;
		}else{
			t = 0;
		}
		
		var topOffset:number = t;
		var baseOffset:number = t + h;
		
		return [topOffset, baseOffset];
	}

	
	public static popLimit(array:any[], limit:number):void{
		if (array.length > limit) array.pop();
	}

	
	public static splicePop(value:any, array:any[], limit:number):void{
		array.splice(0,0, value);
		if (array.length > limit) array.pop();
	}

	
	public static getPercent(value:number):string{
		return Math.round(value * 100) +'%';
	}

	
	public static distanceTravelled(value:number, start:number, end:number):number{
		var distance:number = end - start;
		var travelled:number = value - start;
		return travelled/distance;
	}

}