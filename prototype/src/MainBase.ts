/**
 * ...
 * @author Tyson Van Prooijen
 */

class MainBase
{
	public _container:JQuery;
	public _initiated:boolean;
	//public _loader:Component;
	
	constructor(){
		Model.get().mainBase = this;
		
		// set APIs
		Model.get().fileAPI = new FileAPI();
		Model.get().displayAPI = new DisplayAPI();
		
		this._container = $('body');
	}
	
	//>> StartupCommand
	public init():void{
		this._initiated = true;
		//this.resize();
		
		Model.get().displayAPI.init();
	}
	
	//>> DisplayAPI
	public resize():void{
		if (!this._initiated) return;
		//
	}
}