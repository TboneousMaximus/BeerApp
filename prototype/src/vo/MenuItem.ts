/**
 * ...
 * @author Tyson Van Prooijen
 */

class MenuItem
{
	public id:string;
	public label:string;
	public menu:Menu;
	public target:JQuery;
	public component:MenuButton;
	public selected:boolean;
	public enabled:boolean = true;

	constructor(){}
}