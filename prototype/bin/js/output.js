var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = (function () {
    function Component(div) {
        this.div = div;
    }
    Component.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'Component'; }
        if (Model.get().logAll)
            console.log(classId + id, value);
    };
    return Component;
}());
var ModelBase = (function () {
    function ModelBase() {
        this.logAll = false;
        this.logErrors = false;
        this.logFunctions = false;
        this.logImportant = false;
        this.logInline = false;
        this.logLoads = false;
        this.logTesting = false;
    }
    ModelBase.get = function () {
        if (!Model.instantiated)
            Model.instantiated = new Model();
        return Model.instantiated;
    };
    return ModelBase;
}());
var MainBase = (function () {
    function MainBase() {
        Model.get().mainBase = this;
        Model.get().fileAPI = new FileAPI();
        Model.get().displayAPI = new DisplayAPI();
        this._container = $('body');
    }
    MainBase.prototype.init = function () {
        this._initiated = true;
        Model.get().displayAPI.init();
    };
    MainBase.prototype.resize = function () {
        if (!this._initiated)
            return;
    };
    return MainBase;
}());
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        var _this = _super.call(this) || this;
        _this.version = '0.6.0';
        _this.beers = [];
        _this.beerStyles = [];
        return _this;
    }
    return Model;
}(ModelBase));
var StartupCommand = (function () {
    function StartupCommand() {
        this.loadCount = 0;
        this.loadTotal = 1;
        this.apiKey = "865b6a5e9890188485b0004a1563a12a";
    }
    StartupCommand.prototype.execute = function () {
        this.loadData();
    };
    StartupCommand.prototype.loadData = function () {
        this.log('.loadData()');
        this.onSuccessDataTemp();
    };
    StartupCommand.prototype.onErrorLoadData = function () { };
    StartupCommand.prototype.onSuccessData = function (data) {
        this.log('.onSuccessData()');
        console.log($(data));
        this.onReady();
    };
    StartupCommand.prototype.onSuccessDataTemp = function () {
        var _this = this;
        this.loadTotal++;
        Model.get().tempImage = Model.get().fileAPI.assetsUrl + 'images/temp.png';
        var tempPreload = [Model.get().tempImage];
        Model.get().fileAPI.preloadImages(tempPreload, function () { }, function () { _this.onLoaded('tempimage'); });
        this.doTempDataStyles();
        this.doTempDataBeers();
        this.onLoaded('endLoadData');
    };
    StartupCommand.prototype.onLoaded = function (id) {
        this.loadCount++;
        this.log('.onLoaded(' + id + ') ' + this.loadCount + '/' + this.loadTotal);
        if (this.loadCount == this.loadTotal)
            this.onReady();
    };
    StartupCommand.prototype.onReady = function () {
        this.log('.onReady()');
        Model.get().main.filterView.setData();
        Model.get().main.presentationView.setData();
        Model.get().main.init();
    };
    StartupCommand.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        if (Model.get().logAll || Model.get().logLoads)
            console.log('StartupCommand' + id, value);
    };
    StartupCommand.prototype.doTempDataStyles = function () {
        this.log('.doTempDataStyles()');
        var S;
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
        S.abvRange = [0, 0];
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
    };
    StartupCommand.prototype.doTempDataBeers = function () {
        var S, beersPerStyle = 8, k = 0;
        for (var i in Model.get().beerStyles) {
            S = Model.get().beerStyles[i];
            k = 1;
            while (k <= beersPerStyle) {
                this.addBeer(S, k);
                k++;
            }
        }
    };
    StartupCommand.prototype.addBeer = function (S, k) {
        var B = new BeerItem();
        B.id = 'S' + S.id + '-B' + k;
        B.name = 'Style' + S.id + '-Beer' + k;
        B.description = '<p><strong>' + B.id + '</strong> Lorem ipsum dolor sit amet, prima mnesarchum definiebas duo cu, falli maiorum nominati cum an. Quo id mundi adversarium, est autem dicam ullamcorper in, ea vis habeo viris. Feugiat indoctum efficiendi ne eos. Dicunt iriure an has, error tation aliquando sea te. Eos gubergren mnesarchum id, mea ad prima summo quaerendum. Mel ne feugait imperdiet.</p>';
        B.styleItem = S;
        B.srm = Math.round(Math.random() * 10);
        B.abv = Util.getRandomFromRange(S.abvRange[0], S.abvRange[1], 1);
        B.imageUrls = [Model.get().tempImage, Model.get().tempImage, Model.get().tempImage];
        var ww = Model.get().displayAPI.windowWidth;
        B.imageUrl = B.imageUrls[0];
        if (ww > 720)
            B.imageUrl = B.imageUrls[1];
        if (ww > 1080)
            B.imageUrl = B.imageUrls[2];
        if (S.ibuRange.length > 0) {
            B.ibu = Util.getRandomFromRange(S.ibuRange[0], S.ibuRange[1]);
        }
        Model.get().beers.push(B);
    };
    return StartupCommand;
}());
var UpdateFilterCommand = (function () {
    function UpdateFilterCommand() {
    }
    UpdateFilterCommand.prototype.execute = function () {
        var beers = Model.get().beers;
        var selections = Model.get().main.filterView.menu.selections;
        var beerResult = [];
        var B;
        var BS;
        var BSM;
        var match;
        this.log('.execute() selections', selections);
        var styles = [];
        if (selections.length == 0) {
            styles = Model.get().beerStyles;
        }
        else {
            for (var i in selections) {
                BSM = selections[i].menuItem;
                styles.push(BSM.beerStyleItem);
            }
        }
        if (selections.length == 0)
            beerResult = beers;
        else {
            for (var i in Model.get().beers) {
                B = Model.get().beers[i];
                match = false;
                for (var k in styles) {
                    BS = styles[k];
                    if (B.styleItem.id == BS.id) {
                        match = true;
                        break;
                    }
                }
                if (match)
                    beerResult.push(B);
            }
        }
        this.log('.execute() beerResult', beerResult);
        Model.get().main.presentationView.updateBeers(beerResult);
        Model.get().main.filterView.rangesView.setRanges(styles);
    };
    UpdateFilterCommand.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        if (Model.get().logAll)
            console.log('UpdateFilterCommand' + id, value);
    };
    return UpdateFilterCommand;
}());
var DisplayEvent = (function () {
    function DisplayEvent() {
    }
    DisplayEvent.RESIZE = 'resize';
    DisplayEvent.ORIENTATION_CHANGE = 'orientation_change';
    return DisplayEvent;
}());
var MenuEvent = (function () {
    function MenuEvent() {
    }
    MenuEvent.SELECT = 'menu_event_select';
    return MenuEvent;
}());
var FileAPI = (function () {
    function FileAPI() {
        this.baseUrl = String(window.location).substr(0, String(window.location).lastIndexOf('/') + 1);
        this.assetsUrl = this.baseUrl + 'assets/';
    }
    FileAPI.prototype.preloadImages = function (sources, callbackEach, callbackAll, id) {
        var _this = this;
        if (!id)
            id = 0;
        var source = sources[id];
        var img = $('<img/>').css('display', 'none').attr('src', source).prependTo(document.body);
        img.on('load', function () {
            $(img).remove();
            _this.log('.preloadImages(' + id + ') url:' + sources[id]);
            if (callbackEach)
                callbackEach(source);
            if (id < sources.length - 1) {
                _this.preloadImages(sources, callbackEach, callbackAll, id + 1);
            }
            else {
                if (callbackAll)
                    callbackAll(sources);
            }
        });
    };
    FileAPI.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        if (Model.get().logAll || Model.get().logLoads)
            console.log('FileAPI' + id, value);
    };
    return FileAPI;
}());
var DisplayAPI = (function () {
    function DisplayAPI() {
        var _this = this;
        this.colours = {};
        $(window).resize(function () { _this.resize(); });
        this.setContainer();
        this.checkNavigator();
        this.resize(true);
    }
    DisplayAPI.prototype.init = function () {
        this.log('.init()');
    };
    DisplayAPI.prototype.setContainer = function () {
        Model.get().mainBase._container = $("body");
    };
    DisplayAPI.prototype.addColour = function (id, hex) {
        this.colours[id] = hex;
        this.log('.addColour(' + id + ') ' + hex);
    };
    DisplayAPI.prototype.setColours = function () {
    };
    DisplayAPI.prototype.checkNavigator = function () {
        var n;
        if (navigator.appVersion.indexOf("MSIE 7.") > -1) {
            this.ieVersion = 7;
            n = "ie7";
        }
        if (navigator.appVersion.indexOf("MSIE 8.") > -1) {
            this.ieVersion = 8;
            n = "ie8";
        }
        if (navigator.appVersion.indexOf("MSIE 9.") > -1) {
            this.ieVersion = 9;
            n = "ie9";
        }
        if (navigator.userAgent.match(/iPad/i) != null) {
            this.isIpad = true;
            this.isTablet = true;
            n = "tablet ipad";
        }
        if ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)) {
            this.isIpod = true;
            n = "ipod iphone";
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.isMobile = true;
            n = "mobile";
        }
        if ("ontouchend" in document) {
            this.isTouchSupported = true;
            if (n)
                n += " touch";
            else
                n = "touch";
        }
        $("body").addClass(n);
    };
    DisplayAPI.prototype.resize = function (dontTrigger) {
        if (dontTrigger === void 0) { dontTrigger = false; }
        this.log('.resize()');
        this.stageWidth = parseFloat(Model.get().mainBase._container.css("width"));
        this.stageHeight = parseFloat(Model.get().mainBase._container.css("height"));
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.windowRatio = this.windowWidth / this.windowHeight;
        var ol = (this.windowRatio > 1);
        if (ol != this.orientationLandscape) {
            this.orientationLandscape = ol;
            this.orientationChange();
        }
        if (dontTrigger)
            return;
        Model.get().mainBase.resize();
    };
    DisplayAPI.prototype.orientationChange = function () {
    };
    DisplayAPI.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        if (Model.get().logAll)
            console.log('DisplayAPI' + id, value);
    };
    return DisplayAPI;
}());
var Util = (function () {
    function Util() {
    }
    Util.inRange = function (value, range) {
        return (value > range[0] && value < range[1]);
    };
    Util.getRandomFromRange = function (min, max, decimals) {
        if (min == undefined || max == undefined)
            return -1;
        var n = (Math.random() * (max - min)) + min, x = (decimals > 0) ? decimals * 10 : 1;
        n = Math.floor(n * x) / x;
        return n;
    };
    Util.getOffsetRange = function (target) {
        var t;
        var h = target.outerHeight();
        if (target.offset()) {
            t = target.offset().top;
        }
        else {
            t = 0;
        }
        var topOffset = t;
        var baseOffset = t + h;
        return [topOffset, baseOffset];
    };
    Util.popLimit = function (array, limit) {
        if (array.length > limit)
            array.pop();
    };
    Util.splicePop = function (value, array, limit) {
        array.splice(0, 0, value);
        if (array.length > limit)
            array.pop();
    };
    Util.getPercent = function (value) {
        return Math.round(value * 100) + '%';
    };
    Util.distanceTravelled = function (value, start, end) {
        var distance = end - start;
        var travelled = value - start;
        return travelled / distance;
    };
    return Util;
}());
var FilterView = (function (_super) {
    __extends(FilterView, _super);
    function FilterView(div) {
        var _this = _super.call(this, div) || this;
        _this.div.addClass('filter-view');
        _this.menu = new Menu($('<div id="filter_menu"><h6>Beer styles</h6></div>').appendTo(_this.div), 'check');
        _this.rangesView = new RangesView($('<div id="filter_ranges"></div>').appendTo(_this.div));
        return _this;
    }
    FilterView.prototype.setData = function () {
        this.log('.setData()');
        var menuItem, items = [];
        for (var i in Model.get().beerStyles) {
            menuItem = new BeerStyleMenuItem();
            menuItem.beerStyleItem = Model.get().beerStyles[i];
            menuItem.id = i;
            menuItem.label = Model.get().beerStyles[i].name;
            menuItem.menu = this.menu;
            items.push(menuItem);
        }
        this.menu.populate(items);
        for (var i in this.menu.options) {
            menuItem = this.menu.options[i].menuItem;
            menuItem.beerStyleItem.targetNav = this.menu.options[i];
        }
        this.rangesView.setData();
    };
    FilterView.prototype.init = function () {
        this.log('.init()');
    };
    FilterView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'FilterView'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return FilterView;
}(Component));
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(div, type) {
        if (type === void 0) { type = 'radio'; }
        var _this = _super.call(this, div) || this;
        _this.options = [];
        _this.selections = [];
        _this.div.addClass('menu');
        _this.type = type;
        _this.createOptionsDiv();
        return _this;
    }
    Menu.prototype.createOptionsDiv = function () {
        this.optionsDiv = new Component($('<ul class="options-container"></ul>').appendTo(this.div));
    };
    Menu.prototype.populate = function (menuItems, target) {
        var _this = this;
        var item, but;
        if (!target)
            target = this.optionsDiv.div;
        for (var i in menuItems) {
            item = menuItems[i];
            but = new MenuButton($('<li class="button-' + i + '"></li>').appendTo(target));
            but.div.on(MenuEvent.SELECT, function (e, but) { return _this.onSelect(but); });
            but.id = parseInt(i);
            but.setMenuItem(item, this);
            this.options.push(but);
        }
    };
    Menu.prototype.onSelect = function (but) {
        this.log('.onSelect()', but);
        if (this.type == 'radio') {
            if (but.menuItem.selected)
                return;
            this.deselectAll();
            but.doSelect();
        }
        else if (this.type == 'check') {
            if (but.menuItem.selected)
                but.doDeselect();
            else
                but.doSelect();
        }
        this.setSelections();
        this.log('.onSelect(' + but.menuItem.id + ')');
    };
    Menu.prototype.deselectAll = function () {
        this.log('.deselectAll()');
        var but;
        for (var i in this.options) {
            but = this.options[i];
            but.doDeselect();
        }
    };
    Menu.prototype.setSelections = function () {
        this.selections = [];
        var but;
        for (var i in this.options) {
            but = this.options[i];
            if (but.menuItem.selected)
                this.selections.push(but);
        }
        this.log('.setSelections()', this.selections);
    };
    Menu.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'Menu'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return Menu;
}(Component));
var MenuButton = (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton(div) {
        var _this = _super.call(this, div) || this;
        _this.div.addClass('menu-button');
        _this.div.on('click', function () { return _this.onSelect(); });
        return _this;
    }
    MenuButton.prototype.setMenuItem = function (menuItem, menu) {
        this.menuItem = menuItem;
        menuItem.target = this.div;
        menuItem.component = this;
        menuItem.menu = menu;
        if (menu.type == 'radio') {
            this.div.append('<a>' + menuItem.label + '</a>');
        }
        else if (menu.type == 'check') {
            this.div.append('<a><div class="checkbox"><i class="fa fa-check"/></div>' + menuItem.label + '</a>');
        }
    };
    MenuButton.prototype.onSelect = function () {
        if (!this.menuItem.enabled)
            return;
        this.div.trigger(MenuEvent.SELECT, [this]);
    };
    MenuButton.prototype.doSelect = function () {
        if (this.menuItem.selected)
            return;
        this.menuItem.selected = true;
        this.div.addClass('selected');
    };
    MenuButton.prototype.doDeselect = function () {
        if (!this.menuItem.selected)
            return;
        this.menuItem.selected = false;
        this.div.removeClass('selected');
    };
    MenuButton.prototype.show = function (value) {
        var _this = this;
        if (value === void 0) { value = true; }
        this.div.stop().animate({
            'height': (value) ? this.div.find('a').outerHeight() : 0,
            'opacity': (value) ? 1 : 0
        }, 400, function () {
            if (value)
                _this.div.height('auto');
        });
    };
    MenuButton.prototype.reset = function () {
        this.show(false);
        this.doDeselect();
    };
    return MenuButton;
}(Component));
var PresentationContentView = (function (_super) {
    __extends(PresentationContentView, _super);
    function PresentationContentView(div) {
        var _this = _super.call(this, div) || this;
        _this.slides = [];
        _this.div.addClass('presentation-content-view');
        return _this;
    }
    PresentationContentView.prototype.setData = function () {
        var slide;
        for (var i in Model.get().beers) {
            slide = new PresentationContentSlide($('<div class="slide-' + i + '"></div>').appendTo(this.div));
            slide.setBeerItem(Model.get().beers[i]);
            this.slides.push(slide);
        }
    };
    PresentationContentView.prototype.show = function (slide) {
        if (this.currentSlide) {
            this.currentSlide.show(false);
        }
        this.currentSlide = slide;
        slide.show();
    };
    return PresentationContentView;
}(Component));
var PresentationContentSlide = (function (_super) {
    __extends(PresentationContentSlide, _super);
    function PresentationContentSlide(div) {
        var _this = _super.call(this, div) || this;
        _this.div.addClass('presentation-content-slide');
        _this.figureView = new Component($('<div class="figure-view"><img/></div>').appendTo(_this.div));
        _this.detailsView = new Component($('<div class="details-view copy"><h2 class="beer-name"></h2><div class="beer-description"></div><div class="beer-values"><div class="beer-abv"><h6>abv</h6><span></span></div><div class="beer-ibu"><h6>ibu</h6><span></span></div><div class="beer-srm"><h6>srm</h6><span></span></div><div class="beer-og"><h6>og</h6><span></span></div></div><div class="beer-style"><h6>Style</h6><span></span></div><div class="beer-brewer"><h6>Brewed by</h6><span></span></div></div>').appendTo(_this.div));
        return _this;
    }
    PresentationContentSlide.prototype.setBeerItem = function (beerItem) {
        this.beerItem = beerItem;
        beerItem.targetPresentation = this;
        this.figureView.div.find('img').attr('src', beerItem.imageUrl);
        this.detailsView.div.find('.beer-name').html(beerItem.name);
        this.detailsView.div.find('.beer-description').html(beerItem.description);
        this.detailsView.div.find('.beer-abv span').html(beerItem.abv + '%');
        this.detailsView.div.find('.beer-ibu span').html(String((beerItem.ibu != undefined) ? beerItem.ibu : 'N/A'));
        this.detailsView.div.find('.beer-srm span').html(String(beerItem.srm));
        this.detailsView.div.find('.beer-og span').html(String((beerItem.og != undefined) ? beerItem.og : 'N/A'));
        this.detailsView.div.find('.beer-style span').html(beerItem.styleItem.name);
        this.detailsView.div.find('.beer-brewer span').html('X');
        this.show(false);
    };
    PresentationContentSlide.prototype.show = function (value) {
        if (value === void 0) { value = true; }
        if (value) {
            this.div.scrollTop(0);
            this.div.removeClass('hide');
        }
        else {
            this.div.addClass('hide');
        }
    };
    return PresentationContentSlide;
}(Component));
var PresentationView = (function (_super) {
    __extends(PresentationView, _super);
    function PresentationView(div) {
        var _this = _super.call(this, div) || this;
        _this.div.addClass('presentation-view');
        _this.menu = new Menu($('<div id="presentation_menu"><h6 class="heading">Results</h6></div>').appendTo(_this.div));
        _this.menu.div.on(MenuEvent.SELECT, function (e, but) { return _this.onSelect(but); });
        _this.content = new PresentationContentView($('<div id="presentation_content"></div>').appendTo(_this.div));
        return _this;
    }
    PresentationView.prototype.init = function () {
        this.log('.init()');
    };
    PresentationView.prototype.onSelect = function (but) {
        var menuItem = but.menuItem;
        var beerItem = menuItem.beerItem;
        var target = beerItem.targetPresentation;
        this.content.show(target);
    };
    PresentationView.prototype.setData = function () {
        this.content.setData();
        var menuItem, items = [];
        for (var i in Model.get().beers) {
            menuItem = new BeerMenuItem();
            menuItem.beerItem = Model.get().beers[i];
            menuItem.id = i;
            menuItem.label = Model.get().beers[i].name;
            menuItem.menu = this.menu;
            items.push(menuItem);
        }
        this.menu.populate(items);
        for (var i in this.menu.options) {
            menuItem = this.menu.options[i].menuItem;
            menuItem.beerItem.targetNav = this.menu.options[i];
        }
    };
    PresentationView.prototype.updateBeers = function (beerItems) {
        this.log('.updateBeers() beerItems', beerItems);
        var menuButton;
        for (var i in this.menu.options) {
            menuButton = this.menu.options[i];
            menuButton.reset();
        }
        for (var i in beerItems) {
            beerItems[i].targetNav.show();
        }
        beerItems[0].targetNav.onSelect();
        this.menu.div.scrollTop(0);
    };
    PresentationView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'PresentationView'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return PresentationView;
}(Component));
var RangesView = (function (_super) {
    __extends(RangesView, _super);
    function RangesView(div) {
        var _this = _super.call(this, div) || this;
        _this.ranges = [];
        _this.rangeById = {};
        _this.div.addClass('ranges-view');
        return _this;
    }
    RangesView.prototype.setData = function () {
        var abvRange = this.getAbvRange(Model.get().beerStyles);
        var ibuRange = this.getIbuRange(Model.get().beerStyles);
        this.addRange('abv', 'abv', 0, abvRange[1]);
        this.addRange('ibu', 'ibu', 0, ibuRange[1]);
    };
    RangesView.prototype.setRanges = function (beerStyles) {
        var abvRange = this.getAbvRange(beerStyles);
        var ibuRange = this.getIbuRange(beerStyles);
        this.rangeById['abv'].setRange(abvRange[0], abvRange[1], '%');
        this.rangeById['ibu'].setRange(abvRange[0], ibuRange[1]);
    };
    RangesView.prototype.addRange = function (id, heading, min, max) {
        var range = new RangeView($('<div class="range-' + this.ranges.length + '"></div>').appendTo(this.div), heading, min, max);
        this.ranges.push(range);
        this.rangeById[id] = range;
    };
    RangesView.prototype.getAbvRange = function (beerStyles) {
        var BS;
        var min = 9999;
        var max = 0;
        for (var i in beerStyles) {
            BS = beerStyles[i];
            if (BS.abvRange.length > 0) {
                if (BS.abvRange[0] < min)
                    min = BS.abvRange[0];
                if (BS.abvRange[1] > max)
                    max = BS.abvRange[1];
            }
        }
        this.log('.getAbvRange(' + min + ', ' + max + ')');
        return [min, max];
    };
    RangesView.prototype.getIbuRange = function (beerStyles) {
        var BS;
        var min = 9999;
        var max = 0;
        for (var i in beerStyles) {
            BS = beerStyles[i];
            if (BS.ibuRange.length > 0) {
                if (BS.ibuRange[0] < min)
                    min = BS.ibuRange[0];
                if (BS.ibuRange[1] > max)
                    max = BS.ibuRange[1];
            }
        }
        this.log('.getIbuRange(' + min + ', ' + max + ')');
        return [min, max];
    };
    RangesView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'RangesView'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return RangesView;
}(Component));
var RangeView = (function (_super) {
    __extends(RangeView, _super);
    function RangeView(div, heading, min, max) {
        if (heading === void 0) { heading = 'range'; }
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 0; }
        var _this = _super.call(this, div) || this;
        _this.div.addClass('range-view');
        _this.min = min;
        _this.max = max;
        _this.div.append('<h6>' + heading + '</h6>');
        _this.div.append('<div class="range-indicator"><div class="range-indicator-bar"><div class="range-indicator-dial"></div><div class="range-indicator-dial"></div></div></div>');
        _this.rangeIndicatorBar = new Component(_this.div.find('.range-indicator-bar'));
        _this.div.append('<div class="range-values"><div class="range-from">' + min + '</div><div class="range-to">' + max + '</div></div>');
        _this.labelFrom = new Component(_this.div.find('.range-from'));
        _this.labelTo = new Component(_this.div.find('.range-to'));
        return _this;
    }
    RangeView.prototype.setRange = function (from, to, unit) {
        if (unit === void 0) { unit = ''; }
        this.log('.setRange( ' + from + ', ' + to + ', ' + unit + ')');
        this.labelFrom.div.html(from + unit);
        this.labelTo.div.html(to + unit);
        var fromPercent = (from != 0) ? from / this.max : 0;
        var toPercent = to / this.max;
        var barPercent = toPercent - fromPercent;
        this.log('.setRange() from:to:bar', [fromPercent, toPercent, barPercent]);
        this.rangeIndicatorBar.div.css({
            'margin-left': (100 * fromPercent) + '%',
            'width': (100 * barPercent) + '%'
        });
    };
    RangeView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'RangeView'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return RangeView;
}(Component));
var BeerItem = (function () {
    function BeerItem() {
    }
    return BeerItem;
}());
var BeerStyleItem = (function () {
    function BeerStyleItem() {
        this.ibuRange = [];
        this.abvRange = [];
    }
    return BeerStyleItem;
}());
var MenuItem = (function () {
    function MenuItem() {
        this.enabled = true;
    }
    return MenuItem;
}());
var BeerMenuItem = (function (_super) {
    __extends(BeerMenuItem, _super);
    function BeerMenuItem() {
        return _super.call(this) || this;
    }
    return BeerMenuItem;
}(MenuItem));
var BeerStyleMenuItem = (function (_super) {
    __extends(BeerStyleMenuItem, _super);
    function BeerStyleMenuItem() {
        return _super.call(this) || this;
    }
    return BeerStyleMenuItem;
}(MenuItem));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        Model.get().main = _this;
        _this.configLogs();
        _this.log('.VERSION', '$$$$$ ' + Model.get().version + ' $$$$$');
        _this._container = $('<div id="beer_application"></div>').appendTo($('body'));
        _this.filterView = new FilterView($('<div id="filter_view"></div>').appendTo(_this._container));
        _this.presentationView = new PresentationView($('<div id="presentation_view"></div>').appendTo(_this._container));
        Model.get().startupCommand = new StartupCommand();
        Model.get().updateFilterCommand = new UpdateFilterCommand();
        _this.filterView.div.on(MenuEvent.SELECT, function (e) { return Model.get().updateFilterCommand.execute(); });
        Model.get().startupCommand.execute();
        return _this;
    }
    Main.main = function () {
        var main = new Main();
    };
    Main.prototype.resize = function () {
        this.log('.resize()');
        this.presentationView.div.css('padding-top', this.filterView.div.outerHeight());
    };
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.log('.init()');
        this.filterView.init();
        this.presentationView.init();
        Model.get().updateFilterCommand.execute();
        this.resize();
    };
    Main.prototype.configLogs = function () {
        Model.get().logAll = true;
    };
    Main.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        if (Model.get().logAll)
            console.log('Main' + id, value);
    };
    return Main;
}(MainBase));
//# sourceMappingURL=output.js.map