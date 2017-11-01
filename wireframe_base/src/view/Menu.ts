/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*

	Base Menu

 */

class Menu extends Component
{
	public id:string;
	public type:string = 'radio';// [radio, check] // SMELL: later change to static enum
	public options:MenuButton[] = [];
	public optionsDiv:Component;
	public selections:MenuButton[] = [];
	
	
	constructor(div:JQuery){
		super(div);
		this.div.addClass('menu');
		
		this.createOptionsDiv();
	}
	
	public createOptionsDiv():void{
		this.optionsDiv = new Component($('<ul class="options-container"></ul>').appendTo(this.div));
	}
	
	public populate(menuItems:MenuItem[], target?:JQuery):void{
		var item:MenuItem,
			but:MenuButton;
			
			
		if (!target) target = this.optionsDiv.div;
		
		for (var i in menuItems){
			item = menuItems[i];
			but = new MenuButton($('<li class="button-'+ i +'"><a>'+ item.label +'</a></li>').appendTo( target ));
			but.div.on(MenuEvent.SELECT, (e:MenuEvent, but:MenuButton)=>this.onSelect( but ));
			
			but.id = parseInt(i);
			item.target = but.div;
			item.component = but;
			but.menuItem = item;
			this.options.push( but );
		}
	}

	private onSelect(but:MenuButton):void{
		this.log('.onSelect()', but);
		if (this.type == 'radio'){
			if (but.menuItem.selected) return;
			this.deselectAll();
			but.doSelect();
		}
		else if (this.type == 'check'){
			if (but.menuItem.selected) but.doDeselect();
			else but.doSelect();
		}

		this.setSelections();

		this.log('.onSelect('+ but.menuItem.id +')');
	}

	private deselectAll():void{
		this.log('.deselectAll()');
		var but:MenuButton;
		for (var i in this.options){
			but = this.options[i];
			but.doDeselect();
		}
	}

	private setSelections():void{
		this.selections = [];
		var but:MenuButton;

		for (var i in this.options){
			but = this.options[i];
			if (but.menuItem.selected) this.selections.push( but );
		}

		this.log('.setSelections()', this.selections);
	}

	public log(id:string, value:any='', classId:string='Menu'):void{
		super.log(id, value, classId);
	}
}