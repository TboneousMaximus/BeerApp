/**
 * ...
 * @author Tyson Van Prooijen
 */
 
/// <reference path='references.ts'/>

class Main extends MainBase
{
	public layoutTable:Component;
	public filterView:FilterView;
	public presentationView:PresentationView;
	public curtain:Component;

	
	static main():void{
		var main:Main = new Main();
	}
	
	constructor(){
		super();
        Model.get().main = this;
		
		this.configLogs();
		this.log('.VERSION', '$$$$$ '+ Model.get().version +' $$$$$');


		// set container
		this._container = $('<div id="beer_application"></div>').appendTo( $('body') );

		
		// views
		this.filterView = new FilterView($('<div id="filter_view"></div>').appendTo( this._container ));
		this.presentationView = new PresentationView($('<div id="presentation_view"></div>').appendTo( this._container ));
		this.curtain = new Component($('<div id="main_curtain" class="curtain"><span><strong>LOADING...</strong></span></div>').appendTo( this._container ));

		// commands
		Model.get().startupCommand = new StartupCommand();
		Model.get().updateFilterCommand = new UpdateFilterCommand();
		//

		
		// screens
		// no screens used
		// SMELL: add loading and main screen later
		//
		
		
		// listeners
		this.filterView.div.on(MenuEvent.SELECT, (e:MenuEvent)=>Model.get().updateFilterCommand.execute());
		//
		
		
		//
        Model.get().startupCommand.execute();
    }
	
	
    public resize(){
		//if (!this._initiated) return;
		this.log('.resize()');

		// <SCRIPT> responsive solution for layout 
		var filterHeight:number = this.filterView.div.outerHeight();
		this.presentationView.div.css('padding-top', filterHeight);
		this.presentationView.menu.div.css({
			'margin-top': filterHeight,
			'height': 'calc(100% - '+ filterHeight +'px)'
		});

    }
	
	public init():void{
		super.init();
		this.log('.init()');

		this.filterView.init();
		this.presentationView.init();

		Model.get().updateFilterCommand.execute();

		//
		this.resize();
		//

		// open curtain
		this.curtain.div.delay(1500).animate({
			'opacity': 0
		}, 800, ()=>{
			this.curtain.div.css('display', 'none');
		});
	}
	
	private configLogs():void{
		Model.get().logAll = true;
		// Model.get().logErrors = true;
		// Model.get().logFunctions = true;
		// Model.get().logImportant = true;
		// Model.get().logInline = true;
		// Model.get().logLoads = true;
		// Model.get().logTesting = true;
	}
	
	public log(id:string, value:any=''):void{
		if (Model.get().logAll) console.log('Main'+ id, value);
	}
}