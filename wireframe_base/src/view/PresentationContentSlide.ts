/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*

	Main Content View

	Builds view from BeerItem

 */

class PresentationContentSlide extends Component
{
	public beerItem:BeerItem;
	private figureView:Component;
	private detailsView:Component;


	constructor(div:JQuery){
		super(div);
		this.div.addClass('presentation-content-slide');

		this.figureView = new Component($('<div class="figure-view"><img/></div>').appendTo(this.div));
		this.detailsView = new Component($('<div class="details-view copy"><h2 class="beer-name"></h2><div class="beer-description"></div><div class="beer-values"><div class="beer-abv"><h6>abv</h6><span></span></div><div class="beer-ibu"><h6>ibu</h6><span></span></div><div class="beer-srm"><h6>srm</h6><span></span></div><div class="beer-og"><h6>og</h6><span></span></div></div><div class="beer-style"><h6>Style</h6><span></span></div><div class="beer-brewer"><h6>Brewed by</h6><span></span></div></div>').appendTo(this.div));
	}

	public setBeerItem(beerItem:BeerItem):void{
		this.beerItem = beerItem;
		beerItem.targetPresentation = this;


		//////////////////////////////
		// ADD IMAGES
		//////////////////////////////

		this.figureView.div.find('img').attr('src', beerItem.imageUrl);


		//////////////////////////////
		// POPULATE DETAILS
		//////////////////////////////

		this.detailsView.div.find('.beer-name').html(beerItem.name);

		this.detailsView.div.find('.beer-description').html(beerItem.description);

		this.detailsView.div.find('.beer-abv span').html(beerItem.abv +'%');
		this.detailsView.div.find('.beer-ibu span').html(String( (beerItem.ibu != undefined)? beerItem.ibu : 'N/A' ));
		this.detailsView.div.find('.beer-srm span').html(String(beerItem.srm));
		this.detailsView.div.find('.beer-og span').html(String( (beerItem.og != undefined)? beerItem.og : 'N/A' ));

		this.detailsView.div.find('.beer-style span').html(beerItem.styleItem.name);

		this.detailsView.div.find('.beer-brewer span').html( 'X' );


		// inital hide
		this.show(false);
	}

	public show(value:boolean=true):void{
		if (value) {
			this.div.scrollTop(0);
			this.div.removeClass('hide');
		} else {
			this.div.addClass('hide');
		}
	}
}