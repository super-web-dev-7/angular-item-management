"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SliderService = /** @class */ (function () {
    function SliderService() {
    }
    SliderService.prototype.pauseEvent = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    SliderService.prototype.getPrecision = function (num) {
        var numStr = num.toString();
        var dotIndex = numStr.indexOf('.');
        return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
    };
    SliderService.prototype.cloneArray = function (arr) {
        return arr.slice();
    };
    SliderService.prototype.isNotTouchEvent = function (e) {
        return !e.touches || e.touches.length > 1 ||
            (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
    };
    // convert value to offset in percent
    SliderService.prototype.valueToOffset = function (min, max, value) {
        return (value - min) / (max - min) * 100;
    };
    SliderService.prototype.correctNumLimit = function (num, min, max) {
        var res = +num;
        if (isNaN(res)) {
            return min;
        }
        if (num < min) {
            res = min;
        }
        else if (num > max) {
            res = max;
        }
        return res;
    };
    /**
     * get the offset of an element relative to the document (Reference from jquery's offset())
     * @param elem HTMLElement ref
     */
    SliderService.prototype.getElementOffset = function (elem) {
        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
        }
        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
        var rect = elem.getBoundingClientRect();
        var win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    };
    SliderService = __decorate([
        core_1.Injectable()
    ], SliderService);
    return SliderService;
}());
exports.SliderService = SliderService;
//# sourceMappingURL=slider.service.js.map