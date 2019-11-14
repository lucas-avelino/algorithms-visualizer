"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Render = /** @class */ (function () {
    function Render(element) {
        var _this = this;
        this.renderFrames = [];
        this.framesPerSecond = 25;
        this.ms = 0;
        this.renderLoopHandler = 0;
        this.timeInExec = 1000;
        //Function that starts render 
        this.renderLoop = function () {
            _this.renderLoopHandler = setInterval(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                this.render();
                return [2 /*return*/];
            }); }); }, 1000 / _this.framesPerSecond);
        };
        //Function that prepare render and transform the events into frames to be rendered
        this.prepareRender = function (eventPool) {
            _this.ms = _this.timeInExec * 1000;
            _this.renderFrames = _this.tranformEventsInRenderFrames(eventPool, _this.framesPerSecond, _this.ms || 1000);
        };
        //Function that render the first state of array
        this.initialRender = function (array, name) { return __awaiter(_this, void 0, void 0, function () {
            var h, colSize, unitHSize;
            var _this = this;
            return __generator(this, function (_a) {
                h = this.element.height();
                colSize = 100 / array.length;
                unitHSize = h / Math.max.apply(Math, (array.map(function (a) { return a.value; })));
                this.element.append("<h4 style=\"color:white;position: absolute; top: 0; left: 2px;\">" + name + "</h4>");
                array.map(function (item, i) {
                    _this.element.append("<div val=\"" + item.id + "\" class=\"bar-item bg-primary\" style=\"color: white; order:" + i + "; height: " + unitHSize * item.value + "px;width: " + colSize + "%;\"></div>");
                });
                return [2 /*return*/];
            });
        }); };
        //Function that are called by the render loop to render the next frame
        this.render = function () { return __awaiter(_this, void 0, void 0, function () {
            var frame, key;
            return __generator(this, function (_a) {
                if (this.renderFrames == null || this.renderFrames == [] || !this.renderFrames[0])
                    clearInterval(this.renderLoopHandler);
                frame = this.renderFrames.shift();
                if (JSON.stringify(frame) != "{}") {
                    for (key in frame) {
                        this.element.children(".bar-item[val=" + frame[key].id + "]").css({ "order": key });
                    }
                }
                return [2 /*return*/];
            });
        }); };
        this.mergeEvents = function (events) {
            if (events.length == 0) {
                return null;
            }
            var numberOfElements = events.length;
            var event = events[0];
            if (event == undefined) {
                return null;
            }
            for (var i = 1; i < numberOfElements; i++) {
                for (var key in events[i]) {
                    if (events[i][key]) {
                        event[key] = events[i][key];
                    }
                }
            }
            return event;
        };
        this.tranformEventsInRenderFrames = function (eventPool, frameRate, sizeOfAnimation) {
            var numberOfEvents = eventPool.length;
            var numberOfFrames = sizeOfAnimation > 0
                ? (sizeOfAnimation * frameRate) / 1000
                : (1000 * frameRate) / 1000;
            var numberOfEventsPerFrame = (numberOfEvents / numberOfFrames);
            var frames = [];
            for (var i = numberOfEventsPerFrame; i <= numberOfEvents + numberOfEventsPerFrame && eventPool.length != 0; i += numberOfEventsPerFrame) {
                frames.push(_this.mergeEvents(eventPool.slice((i - (numberOfEventsPerFrame) | 0), i | 0)));
            }
            return frames.filter(function (a) { return a != null; });
        };
        this.element = element;
    }
    return Render;
}());
exports.default = Render;
