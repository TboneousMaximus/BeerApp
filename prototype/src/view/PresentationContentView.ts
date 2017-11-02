/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*

	Handles all slides and toggling visibility

	Builds slides from beerItems

 */

class PresentationContentView extends Component
{
	public slides:PresentationContentSlide[] = [];
	public currentSlide:PresentationContentSlide;

	
	constructor(div:JQuery){
		super(div);

		this.div.addClass('presentation-content-view');
	}
	
	public setData():void{
		var slide:PresentationContentSlide;

		for (var i in Model.get().beers){
			slide = new PresentationContentSlide($('<div class="slide-'+ i +'"></div>').appendTo(this.div));
			slide.setBeerItem( Model.get().beers[i] );
			this.slides.push( slide );
		}

	}

	public show(slide:PresentationContentSlide):void{
		if (this.currentSlide) {
			this.currentSlide.show(false);
		}

		this.currentSlide = slide;
		slide.show();
	}
}