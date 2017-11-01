/**
 * ...
 * @author Tyson Van Prooijen
 */

/*

	Sets range based on from/to and the set min/max

*/

class RangeView extends Component
{
	private min:number;
	private max:number;

	private rangeIndicatorBar:Component;
	private labelFrom:Component;
	private labelTo:Component;


	constructor(div:JQuery, heading:string='range', min:number=0, max:number=0){
		super(div);
		this.div.addClass('range-view');

		this.min = min;
		this.max = max;

		this.div.append('<h6>'+ heading +'</h6>');

		this.div.append('<div class="range-indicator"><div class="range-indicator-bar"><div class="range-indicator-dial"></div><div class="range-indicator-dial"></div></div></div>');
		this.rangeIndicatorBar = new Component(this.div.find('.range-indicator-bar'));

		this.div.append('<div class="range-values"><div class="range-from">'+ min +'</div><div class="range-to">'+ max +'</div></div>');

		this.labelFrom = new Component(this.div.find('.range-from'));
		this.labelTo = new Component(this.div.find('.range-to'));
	}

	public setRange(from:number, to:number, unit:string=''):void{
		this.log('.setRange( '+ from +', '+ to +', '+ unit +')');
		this.labelFrom.div.html(from + unit);
		this.labelTo.div.html(to + unit);

		// assuming min is always 0...

		var fromPercent:number = (from != 0)? from / this.max : 0;
		var toPercent:number = to / this.max;
		var barPercent:number = toPercent - fromPercent;

		this.log('.setRange() from:to:bar', [fromPercent, toPercent, barPercent]);

		this.rangeIndicatorBar.div.css({
			'margin-left': (100*fromPercent) + '%',
			'width': (100*barPercent) + '%'
		})

	}
	

	public log(id:string, value:any='', classId:string='RangeView'):void{
		super.log(id, value, classId);
	}
}