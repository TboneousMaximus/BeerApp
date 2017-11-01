/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*
	
	Sets ranges based on beerStyleItem > abvRange, ibuRange

	Updated from UpdateFilterCommand

 */


class RangesView extends Component
{
	public ranges:RangeView[] = [];
	public rangeById:{[id:string]:RangeView} = {};
	

	constructor(div:JQuery){
		super(div);
		this.div.addClass('ranges-view');
	}

	public setData():void{
		var abvRange:number[] = this.getAbvRange( Model.get().beerStyles );
		var ibuRange:number[] = this.getIbuRange( Model.get().beerStyles );

		this.addRange('abv', 'abv', 0, abvRange[1]);
		this.addRange('ibu', 'ibu', 0, ibuRange[1]);
	}

	public setRanges( beerStyles:BeerStyleItem[] ):void{
		var abvRange:number[] = this.getAbvRange( beerStyles );
		var ibuRange:number[] = this.getIbuRange( beerStyles );

		this.rangeById['abv'].setRange( abvRange[0], abvRange[1], '%');
		this.rangeById['ibu'].setRange( abvRange[0], ibuRange[1]);
	}


	public addRange(id:string, heading:string, min:number, max:number):void{
		var range:RangeView = new RangeView($('<div class="range-'+ this.ranges.length +'"></div>').appendTo( this.div ), heading, min, max);
		this.ranges.push( range );
		this.rangeById[ id ] = range;
	}


	public getAbvRange( beerStyles:BeerStyleItem[] ):number[]{
		var BS:BeerStyleItem;
		var min:number = 9999;
		var max:number = 0;

		for (var i in beerStyles){
			BS = beerStyles[i];

			if (BS.abvRange.length > 0){
				if (BS.abvRange[0] < min) min = BS.abvRange[0];
				if (BS.abvRange[1] > max) max = BS.abvRange[1];
			}
		}

		this.log('.getAbvRange('+ min +', '+ max +')');

		return [min, max];
	}


	public getIbuRange( beerStyles:BeerStyleItem[] ):number[]{
		var BS:BeerStyleItem;
		var min:number = 9999;
		var max:number = 0;

		for (var i in beerStyles){
			BS = beerStyles[i];
			
			if (BS.ibuRange.length > 0){
				if (BS.ibuRange[0] < min) min = BS.ibuRange[0];
				if (BS.ibuRange[1] > max) max = BS.ibuRange[1];
			}
		}

		this.log('.getIbuRange('+ min +', '+ max +')');

		return [min, max];
	}
	

	public log(id:string, value:any='', classId:string='RangesView'):void{
		super.log(id, value, classId);
	}
}