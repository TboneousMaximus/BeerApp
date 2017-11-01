/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*

	Handles navigator, resize and colours
 
 */

class DisplayAPI
{
	public windowWidth:number;
	public windowHeight:number;
	public stageWidth:number;
	public stageHeight:number;
	public windowRatio:number;
	public orientationLandscape:boolean;

	// public mainFocusPoint:Point = new Point();
	
	// SMELL: replace with browserItem and Util.setBrowser();
	public browserNavigator:string;
	public ieVersion:number;
	public isIpad:boolean;
	public isIpod:boolean;
	public isMobile:boolean;
	public isTablet:boolean;
	public isTv:boolean;
	public isTouchSupported:boolean;
	
	public colours:{[id:string]:string} = {};
	
	
	
	constructor(){
		$(window).resize(()=>{this.resize()});
		
		this.setContainer();
		this.checkNavigator();
		this.resize(true);
	}
	
	public init():void{
		this.log('.init()');
		//
	}
	
	public setContainer():void{
		Model.get().mainBase._container =  $("body");
	}
	
	public addColour(id:string, hex:string):void{
		this.colours[id] = hex;
		this.log('.addColour('+ id +') '+ hex);
	}
	
	public setColours():void{
		//
		
		// Model.get().main.setColours();
	}
	
	private checkNavigator():void{
		var n:string;
		
		if (navigator.appVersion.indexOf("MSIE 7.")>-1){
			// this.browserNavigator = NavigatorVersion.IE7;
			this.ieVersion = 7;
			n = "ie7";
		}
		
		if (navigator.appVersion.indexOf("MSIE 8.")>-1){
			// this.browserNavigator = NavigatorVersion.IE8;
			this.ieVersion = 8;
			n = "ie8";
		}
		
		if (navigator.appVersion.indexOf("MSIE 9.")>-1){
			// this.browserNavigator = NavigatorVersion.IE9;
			this.ieVersion = 9;
			n = "ie9";
		}
		
		if (navigator.userAgent.match(/iPad/i) != null){
			// this.browserNavigator = NavigatorVersion.IPAD;
			this.isIpad = true;
			this.isTablet = true;
			n = "tablet ipad";
		}
		
		if ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)){
			// this.browserNavigator = NavigatorVersion.IPOD;
			this.isIpod = true;
			n = "ipod iphone";
		}
		
		if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			this.isMobile = true;
			n = "mobile";
		}
		
		// if (this.browserNavigator == "") Logger.log(LogType.ERROR, ">>> ERROR <<< No navigator found!");
		
		if ("ontouchend" in document) {
			this.isTouchSupported = true;
			if (n) n += " touch";
			else n = "touch";
		}
		
		$("body").addClass(n);
	}
	
	private resize(dontTrigger:boolean=false):void{
		this.log('.resize()');
		this.stageWidth = parseFloat(Model.get().mainBase._container.css("width"));
		this.stageHeight = parseFloat(Model.get().mainBase._container.css("height"));
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
		
		this.windowRatio = this.windowWidth / this.windowHeight;
		var ol = (this.windowRatio > 1);
		
		if (ol != this.orientationLandscape){
			this.orientationLandscape = ol;
			this.orientationChange();
		}
		
		// will need to add dictionary of scrollers;
		// Model.get().main.mainContent.setY();
		
		if (dontTrigger) return;
		
		Model.get().mainBase.resize();
	}
	
	private orientationChange():void{
		//
		
	}
	
	private log(id:string, value:any=''):void{
		if (Model.get().logAll) console.log('DisplayAPI'+ id, value);
	}
	
}