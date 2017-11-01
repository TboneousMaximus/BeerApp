/**
 * ...
 * @author Tyson Van Prooijen
 */

class BeerStyleItem
{
	public id:number;
	public name:string;
	public categoryId:number;
	public categoryName:string;
	public ibuRange:number[] = [];
	public abvRange:number[] = [];

	public targetNav:MenuButton;

	constructor(){}
}