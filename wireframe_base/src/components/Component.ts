/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*
	
	Base Component

 */

class Component
{
	public div:JQuery;


	constructor(div:JQuery){
		this.div = div;
	}


	public log(id:string, value:any='', classId:string='Component'):void{
		if (Model.get().logAll) console.log(classId+id, value);
	}
}