/**
 * ...
 * @author Tyson Van Prooijen
 */


 /*

	Builds menu from BeerStyleItems

	Builds rangesView and sets limits from BeerStyleItem > abvRange, ibuRange

	Triggers updateFilterCommand on menu.onSelect()

 */


class FilterView extends Component
{
	public menu:Menu;
	public rangesView:RangesView;

	
	constructor(div:JQuery){
		super(div);
		this.div.addClass('filter-view');

		this.menu = new Menu($('<div id="filter_menu"><h6>Beer styles</h6></div>').appendTo( this.div ));
		this.menu.type = "check";
		
		// change to new view
		this.rangesView = new RangesView($('<div id="filter_ranges"></div>').appendTo( this.div ));
	}


	public setData():void{
		this.log('.setData()');

		var menuItem:BeerStyleMenuItem,
			items:MenuItem[] = [];


		for (var i in Model.get().beerStyles){
			menuItem = new BeerStyleMenuItem();
			menuItem.beerStyleItem = Model.get().beerStyles[i];
			menuItem.id = i;
			menuItem.label = Model.get().beerStyles[i].name;
			menuItem.menu = this.menu;
			items.push( menuItem );
		}

		// populate menu
		this.menu.populate( items );

		// add target to beerStyleItem
		for (var i in this.menu.options){
			menuItem = <BeerStyleMenuItem>this.menu.options[i].menuItem;
			menuItem.beerStyleItem.targetNav = this.menu.options[i];
		}

		// set range data
		this.rangesView.setData();
	}


	public init():void{
		this.log('.init()');
	}
	

	public log(id:string, value:any='', classId:string='FilterView'):void{
		super.log(id, value, classId);
	}
}
		