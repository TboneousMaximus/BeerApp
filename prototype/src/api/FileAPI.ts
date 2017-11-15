/**
 * ...
 * @author Tyson Van Prooijen
 */


 /*
	
	Handles locations and loading resources

	SMELL: Later add loadData(url, type, etc) here to be called from StartupCommand

 */

class FileAPI
{
	public baseUrl:string;
	public assetsUrl:string;
	
	
	constructor(){
		this.baseUrl = String(window.location).substr(0, String(window.location).lastIndexOf('/') + 1);
		this.assetsUrl = this.baseUrl + 'assets/';
	}

	// SMELL: add pagination to php
	public phpRequestFromAjax( url:string, functionId:string, valueId:string, onSuccess:Function ):void{
		this.log('.phpRequestFromAjax('+ url +', '+ functionId +', '+ valueId +')');
		
		$.ajax({
	        url: url,
	        type: 'GET',
    		data: { functionId:functionId, valueId:valueId },
	        success: function (result) {
	        	onSuccess( result );
	        },
	        error: function () {
	           alert('FileAPI.phpRequestFromAjax('+ url +') >>> ERROR!');
	        }
	    });
	}

	
	public preloadImages(sources:string[], callbackEach?:Function, callbackAll?:Function, id?:number):void{
		if (!id) id = 0;
		
		var source:string = sources[id];
		var img:JQuery = $('<img/>').css('display', 'none').attr('src', source).prependTo(document.body);
		 
		img.on('load', ()=>{
			$(img).remove();

			this.log('.preloadImages('+ id +') url:'+ sources[id]);
			
			if (callbackEach) callbackEach(source);
			
			if (id < sources.length-1){
				this.preloadImages(sources, callbackEach, callbackAll, id+1);
			} else {
				if (callbackAll) callbackAll(sources);
			}
		});
	}
	
	
	public log(id:string, value:any=''):void{
		if (Model.get().logAll || Model.get().logLoads) console.log('FileAPI'+ id, value);
	}
}