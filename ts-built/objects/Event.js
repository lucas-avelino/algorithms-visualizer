"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = {
    Movement: 0,
};
//Class that contains the event logic
var Event = /** @class */ (function () {
    function Event(eventType, data) {
        if (eventType == exports.EventType.Movement) {
            var diff = {};
            for (var key in data.initialState) {
                if (data.initialState[key] != data.endState[key]) {
                    diff[key] = data.endState[key];
                }
            }
            this.value = diff;
        }
    }
    return Event;
}());
exports.default = Event;
