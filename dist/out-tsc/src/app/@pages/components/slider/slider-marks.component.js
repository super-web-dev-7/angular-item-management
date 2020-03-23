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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var convert_1 = require("../util/convert");
var pgSliderMarksComponent = /** @class */ (function () {
    function pgSliderMarksComponent() {
        this._vertical = false;
        this._included = false;
        // Dynamic properties
        this.LowerBound = null;
        this.UpperBound = null;
    }
    Object.defineProperty(pgSliderMarksComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderMarksComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderMarksComponent.prototype.ngOnChanges = function (changes) {
        if (changes.MarksArray) {
            this.buildAttrs();
        }
        if (changes.MarksArray || changes.LowerBound || changes.UpperBound) {
            this.togglePointActive();
        }
    };
    pgSliderMarksComponent.prototype.trackById = function (index, attr) {
        return attr.id;
    };
    pgSliderMarksComponent.prototype.buildAttrs = function () {
        var _this = this;
        var range = this.Max - this.Min;
        this.attrs = this.MarksArray.map(function (mark) {
            var _a;
            var value = mark.value, offset = mark.offset, config = mark.config;
            // calc styles
            var label = config;
            var style;
            if (_this.Vertical) {
                style = {
                    marginBottom: '-50%',
                    bottom: (value - _this.Min) / range * 100 + "%"
                };
            }
            else {
                var marksCount = _this.MarksArray.length;
                var unit = 100 / (marksCount - 1);
                var markWidth = unit * 0.9;
                style = {
                    width: markWidth + "%",
                    marginLeft: -markWidth / 2 + "%",
                    left: (value - _this.Min) / range * 100 + "%"
                };
            }
            // custom configuration
            if (typeof config === 'object') {
                label = config.label;
                if (config.style) {
                    style = __assign({}, style, config.style);
                }
            }
            return {
                id: value,
                value: value,
                offset: offset,
                classes: (_a = {},
                    _a[_this.ClassName + "-text"] = true,
                    _a),
                style: style,
                label: label
            };
        }); // END - map
    };
    pgSliderMarksComponent.prototype.togglePointActive = function () {
        var _this = this;
        if (this.attrs && this.LowerBound !== null && this.UpperBound !== null) {
            this.attrs.forEach(function (attr) {
                var value = attr.value;
                var isActive = (!_this.Included && value === _this.UpperBound) ||
                    (_this.Included && value <= _this.UpperBound && value >= _this.LowerBound);
                attr.classes[_this.ClassName + "-text-active"] = isActive;
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "LowerBound", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "UpperBound", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", MarksArray)
    ], pgSliderMarksComponent.prototype, "MarksArray", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgSliderMarksComponent.prototype, "ClassName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "Min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "Max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderMarksComponent.prototype, "Vertical", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderMarksComponent.prototype, "Included", null);
    pgSliderMarksComponent = __decorate([
        core_1.Component({
            selector: 'pg-slider-marks',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div [class]=\"ClassName\">\n      <span *ngFor=\"let attr of attrs; trackBy: trackById\" [ngClass]=\"attr.classes\" [ngStyle]=\"attr.style\" [innerHTML]=\"attr.label\"></span>\n    </div>\n  "
        })
    ], pgSliderMarksComponent);
    return pgSliderMarksComponent;
}());
exports.pgSliderMarksComponent = pgSliderMarksComponent;
var Marks = /** @class */ (function () {
    function Marks() {
    }
    return Marks;
}());
exports.Marks = Marks;
// TODO: extends Array could cause unexpected behavior when targeting es5 or below
var MarksArray = /** @class */ (function (_super) {
    __extends(MarksArray, _super);
    function MarksArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarksArray;
}(Array));
exports.MarksArray = MarksArray;
//# sourceMappingURL=slider-marks.component.js.map