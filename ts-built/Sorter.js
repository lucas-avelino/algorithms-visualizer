"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("./objects/Event");
var Render_1 = require("./Render");
var Event_2 = require("./objects/Event");
var SortList = {
    Bubble: 0,
    Insertion: 1,
    Quick: 2,
    Merge: 3
};
var Sorter = /** @class */ (function (_super) {
    __extends(Sorter, _super);
    function Sorter(element) {
        var _this = _super.call(this, element) || this;
        _this.eventPool = [];
        _this.addEvent = function (eventType, data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.eventPool.push(new Event_1.default(eventType, data));
                return [2 /*return*/];
            });
        }); };
        _this.bubbleSort = function () {
            _this.timeInExec = -performance.now();
            try {
                var arrayHoldedState = __spreadArrays(_this.array);
                for (var i = 0; i < _this.array.length; i++) {
                    for (var j = 0; j < _this.array.length - i; j++) {
                        if (_this.array[i] && _this.array[j + 1] && _this.array[j].value > _this.array[j + 1].value) {
                            var aux = _this.array[j];
                            _this.array[j] = _this.array[j + 1];
                            _this.array[j + 1] = aux;
                            _this.addEvent(Event_2.EventType.Movement, { initialState: arrayHoldedState, endState: __assign({}, _this.array) });
                        }
                        arrayHoldedState = __spreadArrays(_this.array);
                    }
                }
            }
            catch (error) {
                return;
            }
            // await this.render(this.array);
            _this.timeInExec += performance.now();
            _this.prepareRender(_this.eventPool);
            return _this;
        };
        _this.insertionSort = function () {
            var insertion = function () {
                try {
                    for (var i = 0; i < _this.array.length; i++) {
                        var key = _this.array[i];
                        var arrayHoldedState = __spreadArrays(_this.array);
                        var j = i - 1;
                        while (j >= 0 && _this.array[j].value > key.value) {
                            _this.array[j + 1] = _this.array[j];
                            j = j - 1;
                            _this.addEvent(Event_2.EventType.Movement, { initialState: arrayHoldedState, endState: __assign({}, _this.array) });
                            arrayHoldedState = __spreadArrays(_this.array);
                        }
                        _this.array[j + 1] = key;
                        _this.addEvent(Event_2.EventType.Movement, { initialState: arrayHoldedState, endState: __assign({}, _this.array) });
                        arrayHoldedState = __spreadArrays(_this.array);
                    }
                }
                catch (error) {
                    return;
                }
            };
            _this.timeInExec = -performance.now();
            insertion();
            _this.timeInExec += performance.now();
            _this.prepareRender(_this.eventPool);
            return _this;
        };
        _this.quickSort = function () {
            try {
                var quick_1 = function (lo, hi) {
                    if (lo < hi) {
                        var p = particiona_1(lo, hi);
                        quick_1(lo, p - 1);
                        quick_1(p + 1, hi);
                    }
                };
                var particiona_1 = function (lo, hi) {
                    var pivot = _this.array[hi];
                    _this.timeInExec += performance.now();
                    var arrayHoldedState = __assign({}, _this.array);
                    _this.timeInExec -= performance.now();
                    var i = lo;
                    for (var j = lo; j <= hi; j++) {
                        if (_this.array[j].value < pivot.value) {
                            var aux_1 = _this.array[i];
                            _this.array[i] = _this.array[j];
                            _this.array[j] = aux_1;
                            // console.time("[add-event][118]");
                            _this.timeInExec += performance.now();
                            _this.addEvent(Event_2.EventType.Movement, { initialState: arrayHoldedState, endState: __assign({}, _this.array) });
                            arrayHoldedState = __spreadArrays(_this.array);
                            _this.timeInExec -= performance.now();
                            // console.timeEnd("[add-event][118]");
                            i++;
                        }
                    }
                    var aux = _this.array[i];
                    _this.array[i] = _this.array[hi];
                    _this.array[hi] = aux;
                    _this.timeInExec += performance.now();
                    _this.addEvent(Event_2.EventType.Movement, { initialState: arrayHoldedState, endState: __assign({}, _this.array) });
                    // console.time("[add-event][118]");
                    _this.timeInExec -= performance.now();
                    // console.timeEnd("[add-event][118]");
                    // this.eventPool.push(CreateEvent(arrayHoldedState, {...this.array}, EventType.Movement));
                    // arrayHoldedState = {...this.array};
                    return i;
                };
                _this.timeInExec -= performance.now();
                quick_1(0, _this.array.length - 1);
                _this.timeInExec += performance.now();
            }
            catch (error) {
                return _this;
            }
            _this.prepareRender(_this.eventPool);
            return _this;
        };
        _this.mergeSort = function () {
            var merge = function (leftArr, rightArr) {
                var sortedArr = [];
                while (leftArr.length && rightArr.length) {
                    if (leftArr[0].value <= rightArr[0].value) {
                        sortedArr.push(leftArr[0]);
                        leftArr = leftArr.slice(1);
                    }
                    else {
                        sortedArr.push(rightArr[0]);
                        rightArr = rightArr.slice(1);
                    }
                }
                while (leftArr.length)
                    sortedArr.push(leftArr.shift());
                while (rightArr.length)
                    sortedArr.push(rightArr.shift());
                return sortedArr;
            };
            var mergeSortRecursive = function (arr) {
                try {
                    if (arr.length < 2) {
                        return arr;
                    }
                    else {
                        var midpoint = Math.floor(arr.length / 2);
                        var leftArr = arr.slice(0, midpoint);
                        var rightArr = arr.slice(midpoint, arr.length);
                        var a = merge(mergeSortRecursive(leftArr), mergeSortRecursive(rightArr));
                        _this.addEvent(Event_2.EventType.Movement, { initialState: arr, endState: a });
                        arr = a;
                        return a;
                    }
                }
                catch (error) {
                }
            };
            _this.timeInExec -= performance.now();
            mergeSortRecursive(_this.array);
            _this.timeInExec += performance.now();
            _this.prepareRender(_this.eventPool);
            return _this;
        };
        return _this;
    }
    return Sorter;
}(Render_1.default));
exports.Sorter = Sorter;
var SorterController = /** @class */ (function (_super) {
    __extends(SorterController, _super);
    function SorterController(div, sort, array, framesPerSecond, element) {
        var _this = _super.call(this, element) || this;
        _this.cancel = function () {
            clearInterval(_this.renderLoopHandler);
            _this.array = null;
            _this.eventPool = [];
        };
        _this = _super.call(this, framesPerSecond) || this;
        _this.element = div;
        switch (sort) {
            case SortList.Bubble:
                _this.typeInExec = "Bubble Sort";
                _this.sort = _this.bubbleSort;
                break;
            case SortList.Insertion:
                _this.typeInExec = "Insertion Sort";
                _this.sort = _this.insertionSort;
                break;
            case SortList.Quick:
                _this.typeInExec = "Quick Sort";
                _this.sort = _this.quickSort;
                break;
            case SortList.Merge:
                _this.typeInExec = "Merge Sort";
                _this.sort = _this.mergeSort;
                break;
        }
        _this.array = array;
        _this.timeInExec = 0;
        _this.framesPerSecond = framesPerSecond;
        _this.initialRender(_this.array, _this.typeInExec);
        return _this;
    }
    return SorterController;
}(Sorter));
exports.default = SorterController;
