/**
 * ...
 * @author Tyson Van Prooijen
 */


 /*

	Main interaction view

	Builds menu and content from beerItems

 */

class PresentationView extends Component
{
	public menu:Menu;
	public content:PresentationContentView;
	

	constructor(div:JQuery){
		super(div);
		this.div.addClass('presentation-view');

		this.menu = new Menu($('<div id="presentation_menu"><h6 class="heading">Results</h6></div>').appendTo(this.div));
		this.menu.div.on(MenuEvent.SELECT, (e:MenuEvent, but:MenuButton)=>this.onSelect(but));

		this.content = new PresentationContentView($('<div id="presentation_content"></div>').appendTo(this.div));
	}

	public init():void{
		this.log('.init()');
		// this.menu.options[0].onSelect();
	}

	public onSelect(but:MenuButton):void{
		var menuItem:BeerMenuItem = <BeerMenuItem>but.menuItem;
		var beerItem:BeerItem = menuItem.beerItem;
		var target:PresentationContentSlide = beerItem.targetPresentation;
		this.content.show( target );
	}
	

	public setData():void{
		//////////////////////////////
		// BUILD CONTENT
		//////////////////////////////
		this.content.setData();


		//////////////////////////////
		// BUILD MENU
		//////////////////////////////
		var menuItem:BeerMenuItem,
			items:MenuItem[] = [];


		for (var i in Model.get().beers){
			menuItem = new BeerMenuItem();
			menuItem.beerItem = Model.get().beers[i];
			menuItem.id = i;
			menuItem.label = Model.get().beers[i].name;
			menuItem.menu = this.menu;
			items.push( menuItem );
		}

		// populate menu
		this.menu.populate( items );

		// add target to beerItem
		for (var i in this.menu.options){
			menuItem = <BeerMenuItem>this.menu.options[i].menuItem;
			menuItem.beerItem.targetNav = this.menu.options[i];
		}
	}


	public updateBeers(beerItems:BeerItem[]):void{
		this.log('.updateBeers() beerItems', beerItems);

		// reset buttons
		var menuButton:MenuButton;
		for (var i in this.menu.options){
			menuButton = this.menu.options[i];
			menuButton.reset();
		}

		// show results
		for (var i in beerItems){
			beerItems[i].targetNav.show();
		}

		// select first
		beerItems[0].targetNav.onSelect();

		// reset scroll
		this.menu.div.scrollTop(0);
	}


	public log(id:string, value:any='', classId:string='PresentationView'):void{
		super.log(id, value, classId);
	}
}