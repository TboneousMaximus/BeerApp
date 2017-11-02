/**
 * ...
 * @author Tyson Van Prooijen
 */

class Model extends ModelBase 
{
	public version:string = '0.6.1';

	// data
	public beers:BeerItem[] = [];
	public beerStyles:BeerStyleItem[] = [];

	// command
	public updateFilterCommand:UpdateFilterCommand;

	//SMELL: TEMP
	public tempImage:string;
	
	constructor(){
		super();
	}
}