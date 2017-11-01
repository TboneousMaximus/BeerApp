/**
 * ...
 * @author Tyson Van Prooijen
 */
 

class BeerItem
{
	public id:string;
	public name:string;
	public description:string;
	public abv:number;
	public ibu:number;
	public srm:number;
	public og:number;
	public styleItem:BeerStyleItem;

	public targetNav:MenuButton;
	public targetPresentation:PresentationContentSlide;


	// SMELL: possibly scrap array
	public imageUrls:string[]; // [ low, med, high ]

	
	public imageUrl:string; // actual image loaded; 


	constructor(){}
}