/**
 * ...
 * @author Tyson Van Prooijen
 */
 
 /*

	TRIGGERED from filterView.menu.menuButton.onSelect()
	
	Gets selections from filterView.menu and creates result
		if no selections returns full list

	Updates abv and ibu ranges in FilterView.rangesView
	Updates list in presentationView.menu

 */

class UpdateFilterCommand
{
	constructor(){}
	
	public execute():void{
		var beers:BeerItem[] = Model.get().beers;
		var selections:MenuButton[] = Model.get().main.filterView.menu.selections;
		var beerResult:BeerItem[] = [];
		var B:BeerItem;
		var BS:BeerStyleItem;
		var BSM:BeerStyleMenuItem;
		var match:boolean;

		this.log('.execute() selections', selections);

		var styles:BeerStyleItem[] = [];

		if (selections.length == 0){
			styles = Model.get().beerStyles;
		}else{
			for (var i in selections) {
				BSM = <BeerStyleMenuItem>selections[i].menuItem;
				styles.push( BSM.beerStyleItem );
			}
		}


		if (selections.length == 0) beerResult = beers;
		else {
			for (var i in Model.get().beers){
				B = Model.get().beers[i];
				match = false;

				for (var k in styles){
					BS = styles[k];
					if (B.styleItem.id == BS.id){
						match = true;
						break;
					}
				}

				if (match) beerResult.push( B );
			}
		}

		this.log('.execute() beerResult', beerResult);

		// update list
		Model.get().main.presentationView.updateBeers( beerResult );


		// update ranges
		Model.get().main.filterView.rangesView.setRanges( styles );
	}


	private log(id:string, value:any=''):void{
		if (Model.get().logAll) console.log('UpdateFilterCommand'+ id, value);
	}
}