/**
 * ...
 * @author Tyson Van Prooijen
 */
var ComponentEvent = (function () {
    function ComponentEvent() {
    }
    ComponentEvent.LOADED = 'loaded';
    ComponentEvent.READY = 'ready';
    ComponentEvent.UPDATE = 'update';
    ComponentEvent.COMPLETE = 'complete';
    ComponentEvent.HIDE = 'hide';
    ComponentEvent.SHOW = 'show';
    ComponentEvent.ANIMATED = 'animated';
    ComponentEvent.SELECTED = 'selected';
    return ComponentEvent;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 * @version 1.0.1
 */
var Logger = (function () {
    function Logger() {
    }
    Logger.log = function (type, text) {
        var doLog = false;
        switch (type) {
            case LogType.ERROR: doLog = Model.get().logErrors;
            case LogType.FUNCTION: doLog = Model.get().logFunctions;
            case LogType.IMPORTANT: doLog = Model.get().logImportant;
            case LogType.INLINE: doLog = Model.get().logInline;
            case LogType.LOADED: doLog = Model.get().logLoads;
            case LogType.TESTING: doLog = Model.get().logTesting;
        }
        //console.log('Logger : '+ type + ' > '+ doLog);
        if (!text)
            console.log('NOLOGTYPE: ' + type);
        if (doLog || Model.get().logAll)
            console.log(text);
    };
    return Logger;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var ModelBase = (function () {
    function ModelBase() {
        //public interactionAPI:InteractionAPI;
        // >>> set these in log types
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
/**
 * ...
 * @author Tyson Van Prooijen
 * @version 1.0.1
 */
var LogType = (function () {
    function LogType() {
    }
    LogType.ERROR = 'error';
    LogType.FUNCTION = 'function';
    LogType.IMPORTANT = 'important';
    LogType.INLINE = 'inline';
    LogType.LOADED = 'loaded';
    LogType.TESTING = 'testing';
    return LogType;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 * @version 1.0.0
 */
var NavigatorVersion = (function () {
    function NavigatorVersion() {
    }
    NavigatorVersion.IE7 = 'ie7';
    NavigatorVersion.IE8 = 'ie8';
    NavigatorVersion.IE9 = 'ie9';
    NavigatorVersion.IE10 = 'ie10';
    NavigatorVersion.IE11 = 'ie11';
    NavigatorVersion.FIREFOX = 'firefox';
    NavigatorVersion.CHROME = 'chome';
    NavigatorVersion.IPAD = 'ipad';
    NavigatorVersion.IPOD = 'ipod';
    NavigatorVersion.IOS = 'ios';
    return NavigatorVersion;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var MainBase = (function () {
    function MainBase() {
        //public _loader:Component;
        this.mainFocusPoint = new Point();
        Logger.log(LogType.FUNCTION, 'MainBase()');
        Model.get().mainBase = this;
        // set APIs
        Model.get().fileAPI = new FileAPI();
        //Model.get().scrollAPI = new ScrollAPI();
        Model.get().displayAPI = new DisplayAPI();
        //Model.get().interactionAPI = new InteractionAPI();
        this._container = $('body');
        this.setUiParams();
    }
    MainBase.prototype.setUiParams = function () { };
    ;
    //public scroll():void{/*ScrollAPI*/} // perhaps keep api to manage components
    MainBase.prototype.scroll = function (scroller) { };
    MainBase.prototype.setColours = function () { };
    //>> StartupCommand
    MainBase.prototype.init = function () {
        this._initiated = true;
        //this.resize();
        Model.get().displayAPI.init();
    };
    //>> DisplayAPI
    MainBase.prototype.resize = function () {
        if (!this._initiated)
            return;
        //
    };
    return MainBase;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Component = (function () {
    function Component(div) {
        this.div = div;
    }
    Component.prototype.show = function (fade) {
        fade = (fade) ? fade : 0;
        this.div.css('visibility', 'visible');
    };
    Component.prototype.hide = function (fade) {
        fade = (fade) ? fade : 0;
        this.div.css('visibility', 'hidden');
    };
    Component.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'Component'; }
        console.log(classId + '[' + this.div.attr('id') + ']' + id, value);
    };
    Component.prototype.resize = function () {
        //
    };
    return Component;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextComponent = (function (_super) {
    __extends(TextComponent, _super);
    function TextComponent(div) {
        _super.call(this, div);
    }
    return TextComponent;
}(Component));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Point = (function () {
    function Point(x, y) {
        this.x = 0;
        this.y = 0;
        if (x && x != undefined)
            this.x = x;
        if (y && y != undefined)
            this.y = y;
    }
    return Point;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Ratio = (function () {
    function Ratio() {
        this.x = .5;
        this.y = .33;
        this.width = 1.618122977346278;
        this.height = 1;
    }
    return Ratio;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var ImageItem = (function () {
    function ImageItem() {
        this.ratio = new Ratio();
    }
    return ImageItem;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var ScrollComponentEvent = (function () {
    function ScrollComponentEvent() {
    }
    ScrollComponentEvent.START = 'scroll_start';
    ScrollComponentEvent.SCROLLING = 'scroll_scrolling';
    ScrollComponentEvent.STOP = 'scroll_stop';
    ScrollComponentEvent.DIRECTION = 'scroll_direction_change';
    return ScrollComponentEvent;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var FocusComponentEvent = (function () {
    function FocusComponentEvent() {
    }
    FocusComponentEvent.FOCUS = 'focus_on_focus';
    FocusComponentEvent.MAIN_FOCUS = 'focus_on_main_focus';
    FocusComponentEvent.VISIBLE = 'focus_on_visible';
    FocusComponentEvent.VISIBLE_TOP = 'focus_on_visible_top';
    FocusComponentEvent.VISIBLE_BOTTOM = 'focus_on_visible_bottom';
    FocusComponentEvent.VISIBLE_IN_BETWEEN = 'focus_on_visible_in_between';
    FocusComponentEvent.ENTER = 'focus_on_enter';
    FocusComponentEvent.EXIT = 'focus_on_exit';
    FocusComponentEvent.FOCUS_PERCENT = 'focus_on_focus_percent';
    //public static FOCUS_MAIN_PERCENT:string = 'focus_on_focus_main_percent';
    FocusComponentEvent.VISIBLE_PERCENT = 'focus_on_visible_percent';
    FocusComponentEvent.ENTER_PERCENT = 'focus_on_enter_percent';
    FocusComponentEvent.EXIT_PERCENT = 'focus_on_exit_percent';
    return FocusComponentEvent;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        _super.call(this);
        this.sectionHistoryLimit = 10;
        this.sectionHistory = [];
        this.version = '1.0.6';
    }
    return Model;
}(ModelBase));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var StartupCommand = (function () {
    function StartupCommand() {
        this.loadCount = 0;
        this.loadTotal = 1;
    }
    StartupCommand.prototype.execute = function () {
        this.loadEnums();
    };
    StartupCommand.prototype.loadEnums = function () {
        var _this = this;
        this.log('.loadEnums()');
        $.ajax({
            type: 'GET',
            crossDomain: false,
            url: Model.get().fileAPI.assetsUrl + 'xml/enums.xml',
            dataType: 'xml',
            success: function (event) { _this.onSuccessEnums(event); },
            error: this.onErrorLoadData
        });
    };
    StartupCommand.prototype.onSuccessEnums = function (enums) {
        this.log('.onSuccessEnums()');
        var thisXml;
        $(enums).find('colours').find('item').each(function () {
            thisXml = $(this);
            Model.get().displayAPI.addColour(thisXml.attr('id').toLowerCase() + '_colour', thisXml.attr('hex'));
        });
        Model.get().displayAPI.setColours();
        this.loadData();
    };
    StartupCommand.prototype.loadData = function () {
        var _this = this;
        this.log('.loadData()');
        $.ajax({
            type: 'GET',
            crossDomain: false,
            url: Model.get().fileAPI.assetsUrl + 'xml/data.xml',
            dataType: 'xml',
            success: function (event) { _this.onSuccessData(event); },
            error: this.onErrorLoadData
        });
    };
    StartupCommand.prototype.onErrorLoadData = function () { };
    StartupCommand.prototype.onSuccessData = function (data) {
        this.log('.onSuccessData()');
        //var thisXml:any;
        //
        //$(data).find('items').find('item').each(function(){
        //thisXml = $(this);
        //});
        //
        //this.loadTotal = 0;
        this.onReady();
    };
    StartupCommand.prototype.tempOnSuccessData = function () {
        //
        //
        this.onReady();
    };
    StartupCommand.prototype.onLoaded = function (id) {
        this.loadCount++;
        this.log('.onLoaded(' + id + ') ' + this.loadCount + '/' + this.loadTotal);
        if (this.loadCount == this.loadTotal)
            this.onReady();
    };
    StartupCommand.prototype.onReady = function () {
        this.log('.onReady()');
        Model.get().main.init();
    };
    StartupCommand.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        console.log('StartupCommand' + id, value);
    };
    return StartupCommand;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var DisplayEvent = (function () {
    function DisplayEvent() {
    }
    DisplayEvent.RESIZE = 'resize';
    DisplayEvent.ORIENTATION_CHANGE = 'orientation_change';
    return DisplayEvent;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var SectionEvent = (function () {
    function SectionEvent() {
    }
    SectionEvent.FOCUS_CEILING = 'section_focus_ceiling';
    SectionEvent.FOCUS_HEADER = 'section_focus_header';
    SectionEvent.FOCUS_MAIN = 'section_focus_main';
    SectionEvent.FOCUS_SUB = 'section_focus_sub';
    SectionEvent.FOCUS_FOOTER = 'section_focus_footer';
    SectionEvent.FOCUS_FLOOR = 'section_focus_floor';
    return SectionEvent;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var FileAPI = (function () {
    function FileAPI() {
        this.baseUrl = String(window.location).substr(0, String(window.location).lastIndexOf('/') + 1);
        this.assetsUrl = this.baseUrl + 'assets/';
    }
    FileAPI.prototype.preloadImages = function (sources, callbackEach, callbackAll, id) {
        var _this = this;
        if (!id)
            id = 0;
        var source = sources[id], img = $('<img/>').css('display', 'none').attr('src', source).prependTo(document.body);
        img.load(function () {
            $(img).remove();
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
        console.log('FileAPI' + id, value);
    };
    return FileAPI;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var DisplayAPI = (function () {
    function DisplayAPI() {
        var _this = this;
        this.mainFocusPoint = new Point();
        this.colours = {};
        $(window).resize(function () { _this.resize(); });
        this.setContainer();
        this.checkNavigator();
    }
    DisplayAPI.prototype.init = function () {
        this.log('.init()');
        this.resize(true);
    };
    DisplayAPI.prototype.setContainer = function () {
        Model.get().mainBase._container = $("body");
    };
    DisplayAPI.prototype.addColour = function (id, hex) {
        this.colours[id] = hex;
        this.log('.addColour(' + id + ') ' + hex);
    };
    DisplayAPI.prototype.setColours = function () {
        //
        Model.get().main.setColours();
    };
    DisplayAPI.prototype.checkNavigator = function () {
        var n;
        if (navigator.appVersion.indexOf("MSIE 7.") > -1) {
            this.browserNavigator = NavigatorVersion.IE7;
            this.ieVersion = 7;
            n = "ie7";
        }
        if (navigator.appVersion.indexOf("MSIE 8.") > -1) {
            this.browserNavigator = NavigatorVersion.IE8;
            this.ieVersion = 8;
            n = "ie8";
        }
        if (navigator.appVersion.indexOf("MSIE 9.") > -1) {
            this.browserNavigator = NavigatorVersion.IE9;
            this.ieVersion = 9;
            n = "ie9";
        }
        if (navigator.userAgent.match(/iPad/i) != null) {
            this.browserNavigator = NavigatorVersion.IPAD;
            this.isIpad = true;
            this.isTablet = true;
            n = "tablet ipad";
        }
        if ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)) {
            this.browserNavigator = NavigatorVersion.IPOD;
            this.isIpod = true;
            n = "ipod iphone";
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.isMobile = true;
            n = "mobile";
        }
        if (this.browserNavigator == "")
            Logger.log(LogType.ERROR, ">>> ERROR <<< No navigator found!");
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
        // will need to add dictionary of scrollers;
        Model.get().main.mainContent.setY();
        if (dontTrigger)
            return;
        Model.get().mainBase.resize();
    };
    DisplayAPI.prototype.orientationChange = function () {
        //
    };
    DisplayAPI.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        console.log('DisplayAPI' + id, value);
    };
    return DisplayAPI;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
// replace strings with hex color or set item for hex rgb etc or use a color blending util
var BrandingColor = (function () {
    function BrandingColor() {
    }
    BrandingColor.PRIMARY = 'primary_branding_color';
    BrandingColor.SECONDARY = 'secondary_branding_color';
    BrandingColor.TERTIARY = 'tertiary_branding_color';
    BrandingColor.GREY_LIGHTER = 'grey_lighter_branding_color';
    BrandingColor.GREY_LIGHT = 'grey_light_branding_color';
    BrandingColor.GREY = 'grey_branding_color';
    BrandingColor.GREY_DARK = 'grey_dark_branding_color';
    BrandingColor.GREY_DARKER = 'grey_darker_branding_color';
    BrandingColor.LINK = 'link_branding_color';
    BrandingColor.HOVER = 'hover_branding_color';
    BrandingColor.FOCUS = 'focus_branding_color';
    BrandingColor.ACTIVE = 'active_branding_color';
    BrandingColor.DISABLED = 'disabled_branding_color';
    return BrandingColor;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var SectionFocus = (function () {
    function SectionFocus() {
    }
    SectionFocus.CEILING = 'section_focus_ceiling';
    SectionFocus.TITLE = 'section_focus_title';
    SectionFocus.MAIN = 'section_focus_main';
    //public static SUB:string = 'section_focus_sub';
    SectionFocus.FOOTER = 'section_focus_footer';
    SectionFocus.FLOOR = 'section_focus_floor';
    SectionFocus.BLUR_TOP = 'section_blur_top';
    SectionFocus.BLUR_BOTTOM = 'section_blur_bottom';
    return SectionFocus;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Direction = (function () {
    function Direction() {
    }
    Direction.UP = 'direction_up';
    Direction.DOWN = 'direction_down';
    Direction.LEFT = 'direction_left';
    Direction.RIGHT = 'direction_right';
    Direction.TOP = 'direction_top';
    Direction.BOTTOM = 'direction_bottom';
    Direction.NULL = 'direction_null';
    return Direction;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var Util = (function () {
    function Util() {
    }
    Util.inRange = function (value, range) {
        return (value > range[0] && value < range[1]);
    };
    // set this up soon
    //public static toggleValue(value:boolean, previousValue:boolean, callback(value):Function):void{
    //
    //}
    Util.getOffsetRange = function (target) {
        var t;
        var h = target.outerHeight();
        if (target.offset()) {
            t = target.offset().top;
        }
        else {
            t = 0;
        }
        //var b:number;// = target.offset().bottom;
        var topOffset = t;
        var baseOffset = t + h;
        //var	bodyRect = document.body.getBoundingClientRect(),
        //elemRect = $(target).getBoundingClientRect(),
        //topOffset   = elemRect.top - bodyRect.top,
        //baseOffset = topOffset + target.outerHeight();
        //var topOffset:number = (t)? t : b - h;
        //var baseOffset:number = (t)? t + h : b;
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
/**
 * ...
 * @author Tyson Van Prooijen
 */
var FocusItem = (function () {
    function FocusItem(id) {
        this.id = id;
    }
    return FocusItem;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var ScrollItem = (function () {
    function ScrollItem(id) {
        this.x = 0;
        this.y = 0;
        this.history = [];
        this.historyLimit = 10;
        this.direction = Direction.DOWN;
        this.currentDirection = Direction.DOWN;
        this.tempDirection = Direction.DOWN;
        this.currentPivotDistance = 0;
        this.pivotY = -1;
        this.id = id;
    }
    return ScrollItem;
}());
/**
 * ...
 * @author Tyson Van Prooijen
 */
var ScrollComponent = (function (_super) {
    __extends(ScrollComponent, _super);
    function ScrollComponent(div, id) {
        var _this = this;
        _super.call(this, div);
        div.scroll(function () { return _this.scroll(); });
        this.item = new ScrollItem((id) ? id : div.attr('id'));
    }
    ScrollComponent.prototype.init = function () {
        //
    };
    ScrollComponent.prototype.scroll = function () {
        this.setX();
        this.setY();
        Util.splicePop(this.item.y, this.item.history, this.item.historyLimit);
        this.setDirection();
        this.div.trigger(ScrollComponentEvent.SCROLLING, this);
    };
    ScrollComponent.prototype.setY = function () {
        this.item.offsetY = this.div.scrollTop() - this.item.y;
        this.item.y = this.div.scrollTop();
        this.item.baseY = this.item.y + this.div.height();
        //this.log('.setY('+ this.item.y +')');
    };
    ScrollComponent.prototype.setX = function () {
        this.item.offsetX = this.div.scrollLeft() - this.item.x;
        this.item.x = this.div.scrollLeft();
        this.item.baseX = this.item.x + this.div.width();
        //this.log('.setX('+ this.item.x +')');
    };
    ScrollComponent.prototype.setDirection = function () {
        this.item.currentDirection = (this.item.history[0] > this.item.history[1]) ? Direction.DOWN : Direction.UP;
        if (this.item.currentDirection != this.item.tempDirection) {
            this.item.tempDirection = this.item.currentDirection;
            this.item.pivotY = this.item.history[0];
            //this.log('.setDirection()', ' PIVOT('+ this.item.currentDirection +') : '+ this.item.pivotY);
            return;
        }
        if (this.item.tempDirection == this.item.direction)
            return;
        this.item.currentPivotDistance = Math.abs(this.item.pivotY - this.item.history[0]);
        //this.log('.setDirection()', ' distance : '+ this.item.currentPivotDistance);
        if (this.item.currentPivotDistance > this.item.pivotDistance) {
            this.item.direction = this.item.tempDirection;
            this.item.tempDirection = Direction.NULL;
            this.log('.setDirection()', ' CHANGE DIRECTION :' + this.item.direction);
            this.div.trigger(ScrollComponentEvent.DIRECTION, this.item.direction, this);
        }
    };
    ScrollComponent.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'ScrollComponent'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return ScrollComponent;
}(Component));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var FocusComponent = (function (_super) {
    __extends(FocusComponent, _super);
    function FocusComponent(div, id, debug) {
        _super.call(this, div);
        div.addClass('focus-component');
        this.item = new FocusItem((id) ? id : div.attr('id'));
        this.setRange();
        if (debug)
            this.addDebug();
        // default
        this.setScroller(Model.get().main.mainContent);
    }
    FocusComponent.prototype.setScroller = function (scroller) {
        this.scroller = scroller;
    };
    FocusComponent.prototype.addDebug = function () {
        this.debug = new Component($('<div class="debug-status"><i class="fa fa-times icon"></i><span class="status">out of focus</span></div').appendTo(this.div));
    };
    FocusComponent.prototype.debugStatusUpdate = function (icon, text) {
        if (!this.debug)
            return;
        this.debug.div.find('.icon').attr('class', 'icon fa fa-' + icon);
        if (text)
            this.debug.div.find('.status').html(text);
    };
    FocusComponent.prototype.setRange = function (value) {
        //this.item.range = (value)? value : [this.div.offset().top, this.div.offset().top + this.div.outerHeight()];
        this.item.range = (value) ? value : Util.getOffsetRange(this.div);
        this.log('.setRange()', this.item.range);
    };
    FocusComponent.prototype.switchClass = function (value, addRemove, remove) {
        if (value)
            this.div.addClass(addRemove);
        else
            this.div.removeClass((remove) ? remove : addRemove);
    };
    FocusComponent.prototype.toggleVisibleTop = function () {
        var value = (this.item.range[0] > this.scroller.item.y
            && this.item.range[0] < this.scroller.item.baseY);
        if (this.item.visibleTop == value)
            return;
        this.item.visibleTop = value;
        this.switchClass(value, 'focus-visible-top');
        this.div.trigger(FocusComponentEvent.VISIBLE_TOP, value, this);
    };
    FocusComponent.prototype.toggleVisibleBottom = function () {
        var value = (this.item.range[1] > this.scroller.item.y
            && this.item.range[1] < this.scroller.item.baseY);
        if (this.item.visibleBottom == value)
            return;
        this.item.visibleBottom = value;
        this.switchClass(value, 'focus-visible-bottom');
        this.div.trigger(FocusComponentEvent.VISIBLE_BOTTOM, value, this);
    };
    FocusComponent.prototype.toggleVisible = function () {
        var value = (this.item.range[0] < this.scroller.item.baseY
            && this.item.range[1] > this.scroller.item.y);
        if (this.item.visible == value)
            return;
        this.item.visible = value;
        this.switchClass(value, 'focus-is-visible');
        this.div.trigger(FocusComponentEvent.VISIBLE, value, this);
    };
    FocusComponent.prototype.toggleFocusMainY = function () {
        var value = Util.inRange(Model.get().displayAPI.mainFocusPoint.y + this.scroller.item.y, this.item.range);
        if (this.item.focusMainY == value)
            return;
        this.item.focusMainY = value;
        this.switchClass(value, 'focus-visible-main-focus-y');
        this.div.trigger(FocusComponentEvent.MAIN_FOCUS, this);
    };
    FocusComponent.prototype.toggleEnter = function () {
        if (this.item.entered)
            return;
        this.item.entered = true;
        this.item.enter = (this.item.exit == Direction.TOP) ? Direction.TOP : Direction.BOTTOM;
        this.div.removeClass('focus-exit-top focus-exit-bottom');
        this.div.addClass('focus-enter-' + (this.item.enter == Direction.TOP) ? 'top' : 'bottom');
        this.div.trigger(FocusComponentEvent.ENTER, this.item.enter, this);
    };
    FocusComponent.prototype.toggleExit = function () {
        if (!this.item.entered)
            return;
        this.item.entered = false;
        if (this.scroller.item.y >= this.item.range[1]) {
            this.item.exit = Direction.TOP;
        }
        else if (this.scroller.item.baseY <= this.item.range[0]) {
            this.item.exit = Direction.BOTTOM;
        }
        this.div.removeClass('focus-enter-top focus-enter-bottom');
        this.div.addClass('focus-enter-' + (this.item.exit == Direction.TOP) ? 'top' : 'bottom');
        this.div.trigger(FocusComponentEvent.EXIT, this.item.exit, this);
    };
    FocusComponent.prototype.toggleFocus = function () {
        var value = (this.item.visibleTop && this.item.visibleBottom);
        if (value) {
            // FOCUS
            if (this.item.focus)
                return;
            if (this.item.seen && this.item.triggerFocusOnce)
                return;
            this.item.seen = true;
        }
        else {
            // BLUR
            if (!this.item.focus)
                return;
        }
        this.switchClass(value, 'focus focus-seen', 'focus');
        this.item.focus = value;
        this.div.trigger(FocusComponentEvent.FOCUS, value, this);
    };
    FocusComponent.prototype.checkFocus = function () {
        this.toggleVisible();
        if (!this.item.visible) {
            this.toggleExit();
            //this.onHidden(); need to reset vis% etc
            return;
        }
        this.setVisiblePercent();
        this.toggleVisibleTop();
        this.toggleVisibleBottom();
        this.toggleFocusMainY();
        this.toggleEnter();
        this.toggleFocus();
        if (this.item.visibleTop && !this.item.visibleBottom) {
            //this.item.state = FocusState.TOP;
            this.debugStatusUpdate('chevron-up', 'top focus ' + Util.getPercent(this.item.visiblePercent));
        }
        if (this.item.visibleBottom && !this.item.visibleTop) {
            //this.item.state = FocusState.BOTTOM;
            this.debugStatusUpdate('chevron-down', 'bottom focus ' + Util.getPercent(this.item.visiblePercent));
        }
        if (!this.item.visibleTop && !this.item.visibleBottom && this.item.visible) {
            //this.item.state = FocusState.IN_BETWEEN;
            this.debugStatusUpdate('arrows-v', 'in between focus ' + Util.getPercent(this.item.visiblePercent));
            this.switchClass(true, 'focus-visible-in-between');
        }
        else {
            this.switchClass(false, 'focus-visible-in-between');
        }
        if (this.item.focus) {
            //this.item.state = FocusState.FOCUS;
            this.debugStatusUpdate('check', 'focus ' + Util.getPercent(this.item.visiblePercent));
            if (this.item.focusMainY) {
                //this.item.state = FocusState.MAIN_FOCUS;
                //this.trigger(FocusComponentEvent.MAIN_FOCUS, this.item.focusMainY);
                this.debugStatusUpdate('check-circle', 'main focus ' + Util.getPercent(this.item.visiblePercent));
            }
        }
    };
    FocusComponent.prototype.setVisiblePercent = function () {
        this.item.visiblePercent = Util.distanceTravelled(this.scroller.item.y, this.item.range[0] - this.scroller.div.height(), this.item.range[1]);
        this.div.trigger(FocusComponentEvent.VISIBLE_PERCENT, this.item.visiblePercent, this);
    };
    FocusComponent.prototype.resize = function () {
        this.setRange();
        this.checkFocus();
        this.log('.resize()');
    };
    FocusComponent.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'FocusComponent'; }
        //super.log(id, value, classId);
    };
    return FocusComponent;
}(Component));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var UserInterfaceView = (function (_super) {
    __extends(UserInterfaceView, _super);
    function UserInterfaceView(div) {
        _super.call(this, div);
        this.div.addClass('user-interface');
        this.debugFocusLineY = new Component($('<div class="debug-focus-line-y"></div>').appendTo(this.div));
    }
    UserInterfaceView.prototype.init = function () {
        this.log('.init()');
    };
    UserInterfaceView.prototype.resize = function () {
        this.log('.resize()');
        var fy = Model.get().displayAPI.windowHeight * (1 - .618);
        Model.get().displayAPI.mainFocusPoint.y = fy;
        this.debugFocusLineY.div.css('top', fy);
    };
    UserInterfaceView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'UI'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return UserInterfaceView;
}(Component));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var SectionView = (function (_super) {
    __extends(SectionView, _super);
    function SectionView(div) {
        _super.call(this, div);
        //private focusHistory:FocusItem[] = [];
        //private focusHistoryLimit:number = 10;
        this.focusComponentById = {};
        this.div.addClass('section-view');
        this._header = $('<header class="section-header"></header>').appendTo(div);
        this._container = $('<div class="section-container"></div>').appendTo(div);
        this._footer = $('<footer class="section-footer"></footer>').appendTo(div);
        //this.hide();
    }
    SectionView.prototype.init = function () {
        //
        this.setFocusParams();
    };
    SectionView.prototype.setFocusParams = function () {
        var _this = this;
        var focusComponent;
        ///// DEFAULT
        focusComponent = new FocusComponent(this.div, 'this_section');
        focusComponent.div.on(FocusComponentEvent.ENTER, function (e, direction) { return _this.onEnter(direction); });
        focusComponent.div.on(FocusComponentEvent.EXIT, function (e, direction) { return _this.onExit(direction); });
        this.focusComponentById[focusComponent.item.id] = focusComponent;
        focusComponent = new FocusComponent(this._container, 'main_container', true);
        focusComponent.div.on(FocusComponentEvent.MAIN_FOCUS, function (e, fc) { return _this.onFocus(fc); });
        this.focusComponentById[focusComponent.item.id] = focusComponent;
    };
    SectionView.prototype.checkFocus = function () {
        var cv = this.focusComponentById['this_section'].item.visible;
        this.focusComponentById['this_section'].checkFocus();
        if (this.focusComponentById['this_section'].item.visible || cv) {
            for (var id in this.focusComponentById) {
                if (id == 'this_section')
                    continue;
                this.focusComponentById[id].checkFocus();
            }
        }
    };
    // will have to set up most like this, or get trigger array
    //public onFocus(value:boolean, fc):void{
    SectionView.prototype.onFocus = function (fc) {
        if (fc.item.id != 'main_container') {
            return;
        }
        var value = fc.item.focusMainY;
        if (value)
            this.div.addClass('focus');
        else
            this.div.removeClass('focus');
    };
    SectionView.prototype.onVisible = function (value) {
        this.log('.onVisible(' + value + ')');
    };
    SectionView.prototype.onEnter = function (direction) {
        this.log('.onEnter(' + direction + ')');
    };
    SectionView.prototype.onExit = function (direction) {
        this.log('.onExit(' + direction + ')');
    };
    SectionView.prototype.scroll = function () {
        this.checkFocus();
    };
    SectionView.prototype.resize = function () {
        this.log('.resize()');
        for (var id in this.focusComponentById)
            this.focusComponentById[id].resize();
    };
    SectionView.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'SectionView'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return SectionView;
}(Component));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var HeroSection = (function (_super) {
    __extends(HeroSection, _super);
    function HeroSection(div) {
        _super.call(this, div);
        // components
        this.heroTitle = new Component($('<h1 class="hero-title"><span>TBONEOUS</span><span>MAXIMUS</span><span>.COM</span></h1>').appendTo(this._header));
        this._footer.addClass('la-bas');
        // behaviours
        //this.hide();
    }
    HeroSection.prototype.setFocusParams = function () {
        _super.prototype.setFocusParams.call(this);
        // debug
        $('<div class="temp-div temp-footer">FOOTER</div>').css({
            'min-height': 64
        }).appendTo(this._footer);
        var focusComponent;
        focusComponent = new FocusComponent(this.heroTitle.div, 'hero_title', true);
        //focusComponent.div.on(FocusComponentEvent.VISIBLE_PERCENT, (e:FocusComponentEvent, value:number)=>this.onVisiblePercent(value));
        this.focusComponentById[focusComponent.item.id] = focusComponent;
        focusComponent = new FocusComponent(this._footer, '.temp-footer', true);
        this.focusComponentById[focusComponent.item.id] = focusComponent;
    };
    HeroSection.prototype.onVisiblePercent = function (value) {
        //var cutoff:number = .5;
        //var rem:number = 1 - cutoff;
        //if (value < cutoff) return;
        //
        //var op:number = rem / (value - cutoff);
        //
        //this.heroTitle.div.css('opacity',  op );
        this.heroTitle.div.css('opacity', value);
    };
    HeroSection.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    HeroSection.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'HeroSection'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return HeroSection;
}(SectionView));
/**
 * ...
 * @author Tyson Van Prooijen
 */
var TempSection = (function (_super) {
    __extends(TempSection, _super);
    function TempSection(div) {
        _super.call(this, div);
        // components
        this.heroTitle = new Component($('<h1 class="hero-title">WELCOME!</h1>').appendTo(this._header));
        // behaviours
        //this.hide();
    }
    TempSection.prototype.setFocusParams = function () {
        var _this = this;
        _super.prototype.setFocusParams.call(this);
        /// debug
        //need to get offset for bottom pos elements
        $('<div class="temp-div temp-footer">FOOTER</div>').css({
            'min-height': 64
        }).appendTo(this._footer);
        $('<div class="temp-div temp-floater">FLOATER</div>').css({
            'position': 'absolute',
            'top': 300,
            'left': 100,
            'width': 300
        }).appendTo(this._container);
        var focusComponent;
        focusComponent = new FocusComponent(this._container.find('.temp-floater'), 'floater', true);
        this.focusComponentById[focusComponent.item.id] = focusComponent;
        focusComponent = new FocusComponent(this.heroTitle.div, 'title', true);
        this.focusComponentById[focusComponent.item.id] = focusComponent;
        focusComponent = new FocusComponent(this._footer.find('.temp-footer'), 'footer', true);
        focusComponent.div.on(FocusComponentEvent.FOCUS, function (e, value) { return _this.onFocusFooter(value); });
        this.focusComponentById[focusComponent.item.id] = focusComponent;
    };
    TempSection.prototype.onFocusTitle = function (value) {
        this.log('.onFocusTitle(' + value + ')');
    };
    TempSection.prototype.onFocusFooter = function (value) {
        this.log('.onFocusFooter(' + value + ')');
    };
    TempSection.prototype.onVisiblePercent = function (value) {
        //var cutoff:number = .5;
        //if (value < cutoff) return;
        //var op:number = (1-cutoff) / (value-cutoff);
        this.heroTitle.div.css('opacity', value);
        //this.heroTitle.div.css('opacity',  1-value );
        // percent of remaider
        // 
    };
    TempSection.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    TempSection.prototype.log = function (id, value, classId) {
        if (value === void 0) { value = ''; }
        if (classId === void 0) { classId = 'TempSection'; }
        _super.prototype.log.call(this, id, value, classId);
    };
    return TempSection;
}(SectionView));
/**
 * ...
 * @author Tyson Van Prooijen
 */
/* === DEFINITIONS === */
/// <reference path="../../../../references/definitions/google.d.ts"/>
/// <reference path="../../../../references/definitions/yepnope.d.ts"/>
/// <reference path="../../../../references/definitions/lib.d.ts"/>
/// <reference path="../../../../references/definitions/jqueryui.d.ts"/>
/// <reference path="../../../../references/definitions/jquery.d.ts"/>
// <reference path="../../../../references/definitions/greensock.d.ts"/>
/* === COMMON === */
/// <reference path="../../../../references/tboneousmaximus/event/ComponentEvent.ts"/>
/// <reference path="../../../../references/tboneousmaximus/util/Logger.ts"/>
/// <reference path="model/ModelBase.ts"/>
/// <reference path="../../../../references/tboneousmaximus/enum/LogType.ts"/>
/// <reference path="../../../../references/tboneousmaximus/enum/NavigatorVersion.ts"/>
/// <reference path="MainBase.ts"/>
/// <reference path="../../../../references/tboneousmaximus/component/Component.ts"/>
/// <reference path="../../../../references/tboneousmaximus/component/TextComponent.ts"/>
/* === COMMON === */
/// <reference path="../../../../references/tboneousmaximus/vo/Point.ts"/>
/// <reference path="../../../../references/tboneousmaximus/vo/Ratio.ts"/>
/// <reference path="../../../../references/tboneousmaximus/vo/ImageItem.ts"/>
/* === LOCAL === */
/// <reference path="event/ScrollComponentEvent.ts"/>
/// <reference path="event/FocusComponentEvent.ts"/>
/// <reference path="model/Model.ts"/>
/// <reference path="Main.ts"/>
/// <reference path="command/StartupCommand.ts"/>
/// <reference path="event/DisplayEvent.ts"/>
/// <reference path="event/SectionEvent.ts"/>
// <reference path="event/ScreenEvent.ts"/>
// <reference path="event/SpriteEvent.ts"/>
/// <reference path="api/FileAPI.ts"/>
// <reference path="api/ScrollAPI.ts"/>
/// <reference path="api/DisplayAPI.ts"/>
// <reference path="api/InteractionAPI.ts"/>
/// <reference path="enum/BrandingColor.ts"/>
/// <reference path="enum/SectionFocus.ts"/>
/// <reference path="enum/Direction.ts"/>
/// <reference path="util/Util.ts"/>
/// <reference path="vo/FocusItem.ts"/>
/// <reference path="vo/ScrollItem.ts"/>
/// <reference path="components/ScrollComponent.ts"/>
/// <reference path="components/FocusComponent.ts"/>
/// <reference path="view/UserInterfaceView.ts"/>
/// <reference path="sections/SectionView.ts"/>
/// <reference path="sections/HeroSection.ts"/>
/// <reference path="sections/TempSection.ts"/>
// <reference path="screen/ScreenBase.ts"/>
// <reference path="screen/HomeScreen.ts"/>
// <reference path="screen/MainMenuScreen.ts"/>
// <reference path="screen/GameScreen.ts"/>
// <reference path="view/Game.ts"/>
// <reference path="view/Menu.ts"/>
// <reference path="view/HomeView.ts"/>
// <reference path="view/GameView.ts"/>
// <reference path="view/MainMenu.ts"/>
// <reference path="view/endlessrunnergame/EndlessRunnerGame.ts"/>
// <reference path="view/sprite/Sprite.ts"/>
// <reference path="view/sprite/character/CharacterSprite.ts"/>
// <reference path="view/sprite/collectable/CollectableSprite.ts"/>
// <reference path="view/sprite/enemy/EnemySprite.ts"/>
// <reference path="view/OptionButton.ts"/>
// <reference path="vo/OptionItem.ts"/>
/**
 * ...
 * @author Tyson Van Prooijen
 */
/// <reference path='references.ts'/>
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = this;
        _super.call(this);
        Model.get().main = this;
        this.configLogs();
        // commands
        Model.get().startupCommand = new StartupCommand();
        console.log('$$$$$ version:' + Model.get().version + ' $$$$$');
        // layers
        this.mainContent = new ScrollComponent($('<div id="main_content"></div>').appendTo(this._container));
        this.mainContent.div.on(ScrollComponentEvent.SCROLLING, function (e, scroller) { return _this.scroll(scroller); });
        //this.mainContent.onScroll = ()=>this.scroll();
        this.ui = new UserInterfaceView($('<div id="main_ui"></div>').appendTo(this._container));
        // sections
        this.sections = [];
        // change to sectionById and no section vars
        this.heroSection = new HeroSection($('<section id="hero_section"></section>').appendTo(this.mainContent.div));
        this.sections.push(this.heroSection);
        this.tempSection = new TempSection($('<section id="temp_section"></section>').appendTo(this.mainContent.div));
        this.sections.push(this.tempSection);
        this.tempSection2 = new TempSection($('<section id="temp_section_2"></section>').appendTo(this.mainContent.div));
        this.sections.push(this.tempSection2);
        // screens
        //
        // listeners
        //
        //
        //Model.get().scrollAPI.init(this.mainContent.div);
        Model.get().startupCommand.execute();
    }
    Main.main = function () {
        var main = new Main();
    };
    Main.prototype.scroll = function (scroller) {
        //this.log('.scroll('+ scroller.attr('id') +')');
        for (var i in this.sections)
            this.sections[i].scroll();
        //
    };
    Main.prototype.updateSection = function (section) {
        if (section == Model.get().currentSection)
            return;
        Model.get().currentSection = section;
        Model.get().sectionHistory.splice(0, 0, Model.get().currentSection);
        Util.popLimit(Model.get().sectionHistory, Model.get().sectionHistoryLimit);
    };
    Main.prototype.setColours = function () {
        this.log('.setColours()');
    };
    Main.prototype.resize = function () {
        //if (!this._initiated) return;
        this.log('.resize()');
        this.ui.resize();
        for (var i in this.sections)
            this.sections[i].resize();
    };
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.log('.init()');
        this.ui.init();
        for (var i in this.sections)
            this.sections[i].init();
        this.resize();
    };
    Main.prototype.configLogs = function () {
        //Model.get().logAll = true;
        //Model.get().logErrors = true;
        //Model.get().logFunctions = true;
        //Model.get().logImportant = true;
        //Model.get().logInline = true;
        //Model.get().logLoads = true;
        //Model.get().logTesting = true;
    };
    Main.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        console.log('Main' + id, value);
    };
    return Main;
}(MainBase));
