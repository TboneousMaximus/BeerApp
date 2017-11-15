/**
 * ...
 * @author Tyson Van Prooijen
 */

 /*
	Load datas
	Preload resources
	Pass data to views to build
	Initiate Main
 */


class StartupCommand
{
	private loadCount:number = 0;
	private loadTotal:number = 1;

	private apiKey:string = "865b6a5e9890188485b0004a1563a12a";
	
	
	constructor(){}
	
	public execute():void{
		this.loadData();
	}
	
	private loadData():void{
		this.log('.loadData()');

		// manually add data until I can pull API
		this.onSuccessDataTemp();



		///////////////////////////////
		// ATTEMPTS TO CONNECT TO API 
		///////////////////////////////


		//////////   SUCCESSFUL !   //////////

		// $.ajax({
	 //        url: 'getBeersStyle1.php',
	 //        type: 'POST',
	 //        // data: {},
	 //        success: function (result) {
	 //        	console.log( result );
	 //        },
	 //        error: function () {
	 //           alert('error');
	 //        }
	 //    });

	    ///////////////////////////////////////




	    //////////   SUCCESSFUL !   //////////

		console.log('LOADING DATA...');

		var i:number = 0, styles:number = 10;

		while (i < styles){
		 	Model.get().fileAPI.phpRequestFromAjax('getBeers.php', 'getBeersByStyleId', i.toString(), (result:any)=>{
		 		console.log( result );
			});
			i++;
		}

		////////////////////////////////////////

	}
	
	private onErrorLoadData():void{}
	
	private onSuccessData(data:Event):void{
		this.log('.onSuccessData()');

		console.log($(data));

		// this.onReady();
	}


	private onSuccessDataTemp():void{

		// PRELOAD IMAGES
		this.loadTotal++;
		Model.get().tempImage = Model.get().fileAPI.assetsUrl +'images/temp.png';
		var tempPreload:string[] = [ Model.get().tempImage ];
		Model.get().fileAPI.preloadImages( tempPreload, ()=>{}, ()=>{ this.onLoaded( 'tempimage' ); } );


		// MANUALLY ADD DATA
		this.doTempDataStyles();
		this.doTempDataBeers();

		this.onLoaded('endLoadData');
	}

	
	
	
	private onLoaded(id:string):void{
		this.loadCount++;
		this.log('.onLoaded('+ id +') '+ this.loadCount +'/'+ this.loadTotal);
		if (this.loadCount == this.loadTotal) this.onReady();
	}
	
	
	private onReady():void{
		this.log('.onReady()');

		Model.get().main.filterView.setData();
		Model.get().main.presentationView.setData();

		Model.get().main.init();
	}
	
	public log(id:string, value:any=''):void{
		if (Model.get().logAll || Model.get().logLoads) console.log('StartupCommand'+ id, value);
	}





	// #################################################
	// 
	// Adding data manually
	// 
	// #################################################
	private doTempDataStyles():void{
		this.log('.doTempDataStyles()');

		// add styles
		var S:BeerStyleItem;


		S = new BeerStyleItem();
		S.id = 1;
		S.name = "British Origin Ales";
		S.abvRange = [4.5, 5.5];
		S.ibuRange = [20, 40];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 2;
		S.name = "Irish Origin Ales";
		S.abvRange = [4, 4.5];
		S.ibuRange = [20, 28];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 3;
		S.name = "North American Origin Ales";
		S.abvRange = [4.5, 5.6];
		S.ibuRange = [30, 42];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 4;
		S.name = "German Origin Ales";
		S.abvRange = [4.8, 5.3];
		S.ibuRange = [18, 25];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 5;
		S.name = "Belgian And French Origin Ales";
		S.abvRange = [4.8, 6.5];
		S.ibuRange = [15, 25];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 6;
		S.name = "International Ale Styles";
		S.abvRange = [4.5, 5.5];
		S.ibuRange = [30, 42];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 7;
		S.name = "European-germanic Lager";
		S.abvRange = [4, 5];
		S.ibuRange = [25, 40];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 8;
		S.name = "North American Lager";
		S.abvRange = [3.8, 5];
		S.ibuRange = [5, 13];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 9;
		S.name = "Other Lager";
		S.abvRange = [7.5, 9];
		S.ibuRange = [35, 40];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 10;
		S.name = "International Styles";
		S.abvRange = [4.5, 5.3];
		S.ibuRange = [17, 30];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 11;
		S.name = "Hybrid/mixed Beer";
		S.abvRange = [4, 5.1];
		S.ibuRange = [10, 30];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 12;
		S.name = "Mead, Cider, & Perry";
		S.abvRange = [0,0];
		S.ibuRange = [];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 13;
		S.name = "Other Origin";
		S.abvRange = [2.1, 2.9];
		S.ibuRange = [15, 25];
		Model.get().beerStyles.push(S);


		S = new BeerStyleItem();
		S.id = 14;
		S.name = "Malternative Beverages";
		S.abvRange = [4, 6];
		S.ibuRange = [];
		Model.get().beerStyles.push(S);
	}

	// #################################################
	// 
	// Adding data manually due to cross domain issues
	// 
	// #################################################




	private doTempDataBeers():void{

		var S:BeerStyleItem,
			beersPerStyle:number = 8,
			k:number = 0;

		for (var i in Model.get().beerStyles){
			S = Model.get().beerStyles[i];
			k = 1;
			while(k <= beersPerStyle){
				this.addBeer(S, k);
				k++;
			}
		}
	}


	private addBeer(S:BeerStyleItem, k:number):void{
		var B:BeerItem = new BeerItem();
		B.id = 'S'+ S.id +'-B'+ k;
		B.name = 'Style'+ S.id +'-Beer'+ k;
		B.description = '<p><strong>'+ B.id +'</strong> Lorem ipsum dolor sit amet, prima mnesarchum definiebas duo cu, falli maiorum nominati cum an. Quo id mundi adversarium, est autem dicam ullamcorper in, ea vis habeo viris. Feugiat indoctum efficiendi ne eos. Dicunt iriure an has, error tation aliquando sea te. Eos gubergren mnesarchum id, mea ad prima summo quaerendum. Mel ne feugait imperdiet.</p>';
		B.styleItem = S;
		B.srm = Math.round(Math.random()*10);
		B.abv = Util.getRandomFromRange( S.abvRange[0], S.abvRange[1], 1 );

		// temp image
		B.imageUrls = [Model.get().tempImage, Model.get().tempImage, Model.get().tempImage];
		
		// SMELL: leter add LOW/MED/HIGH enums to displayAPI on resize and use switch case here
		var ww:number = Model.get().displayAPI.windowWidth;
		B.imageUrl = B.imageUrls[0];
		if (ww > 720) B.imageUrl = B.imageUrls[1];
		if (ww > 1080) B.imageUrl = B.imageUrls[2];

		if (S.ibuRange.length > 0){
			B.ibu = Util.getRandomFromRange( S.ibuRange[0], S.ibuRange[1] );
		}

		Model.get().beers.push(B);
	}
}