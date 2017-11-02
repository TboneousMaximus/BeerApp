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
        _this.version = '0.0.0';
        return _this;
    }
    return Model;
}(ModelBase));
var StartupCommand = (function () {
    function StartupCommand() {
        this.loadCount = 0;
        this.loadTotal = 1;
    }
    StartupCommand.prototype.execute = function () {
        this.loadData();
    };
    StartupCommand.prototype.loadData = function () {
        this.log('.loadData()');
        this.onReady();
    };
    StartupCommand.prototype.onErrorLoadData = function () { };
    StartupCommand.prototype.onSuccessData = function (data) {
        this.log('.onSuccessData()');
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
var FileAPI = (function () {
    function FileAPI() {
        this.baseUrl = String(window.location).substr(0, String(window.location).lastIndexOf('/') + 1);
        this.assetsUrl = this.baseUrl + 'assets/';
    }
    FileAPI.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        Model.get().main = _this;
        _this.configLogs();
        Model.get().startupCommand = new StartupCommand();
        console.log('$$$$$ version:' + Model.get().version + ' $$$$$');
        Model.get().startupCommand.execute();
        return _this;
    }
    Main.main = function () {
        var main = new Main();
    };
    Main.prototype.resize = function () {
        this.log('.resize()');
    };
    Main.prototype.init = function () {
        _super.prototype.init.call(this);
        this.log('.init()');
        this.resize();
    };
    Main.prototype.configLogs = function () {
    };
    Main.prototype.log = function (id, value) {
        if (value === void 0) { value = ''; }
        console.log('Main' + id, value);
    };
    return Main;
}(MainBase));
//# sourceMappingURL=output.js.map