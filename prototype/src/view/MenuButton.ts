/**
 * ...
 * @author Tyson Van Prooijen
 */


 /*

	Base MenuButton

	Used with Menu

 */

class MenuButton extends Component
{
	public id:number;
	public menuItem:MenuItem;
	
	
	constructor(div:JQuery){
		super(div);
		this.div.addClass('menu-button');

		this.div.on('click', ()=>this.onSelect());
	}

	public setMenuItem(menuItem:MenuItem, menu:Menu):void{
		this.menuItem = menuItem;
		menuItem.target = this.div;
		menuItem.component = this;
		menuItem.menu = menu;

		if (menu.type == 'radio'){
			this.div.append('<a>'+ menuItem.label +'</a>');
		}else if (menu.type == 'check'){
			this.div.append('<a><div class="checkbox"><i class="fa fa-check"/></div>'+ menuItem.label +'</a>');
		}
		
	}

	// used as ninja select to trigger as though user clicked
	public onSelect():void{
		if (!this.menuItem.enabled) return;
		this.div.trigger(MenuEvent.SELECT, [this]);
	}

	public doSelect():void{
		if (this.menuItem.selected) return;
		this.menuItem.selected = true;
		this.div.addClass('selected');
	}

	public doDeselect():void{
		if (!this.menuItem.selected) return;

		this.menuItem.selected = false;
		this.div.removeClass('selected');
	}

	public show(value:boolean=true):void{
		this.div.stop().animate({
			'height': (value)? this.div.find('a').outerHeight() : 0,
			'opacity': (value)? 1 : 0
		}, 400, ()=>{
			// return to auto to remain responsive
			if (value) this.div.height('auto');
		});
	}

	public reset():void{
		this.show(false);
		this.doDeselect();
	}

}