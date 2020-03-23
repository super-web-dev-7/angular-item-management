"use strict";
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
var moment = require("moment");
var datepicker_component_1 = require("./datepicker.component");
var pgDateScroller = /** @class */ (function () {
    function pgDateScroller(_elementRef, _renderer, picker) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.picker = picker;
        this._monthList = [];
        this._List = [];
        this._yearList = [];
        this._mode = 'month';
        this.onDateChange = new core_1.EventEmitter();
        this._el = this._elementRef.nativeElement;
    }
    pgDateScroller.prototype._generate = function () {
        var _t = [];
        if (this._mode == "month") {
            for (var i = 0; i < 12; i++) {
                this._monthList.push(i);
            }
            this._List = this._monthList;
        }
        else {
            for (var i = 0; i < 10; i++) {
                this._yearList.push(i);
            }
            this._List = this._yearList;
        }
    };
    pgDateScroller.prototype.ngOnInit = function () {
        this._generate();
    };
    pgDateScroller.prototype.ngAfterViewInit = function () {
        this.alignToElement();
    };
    Object.defineProperty(pgDateScroller.prototype, "selectedMonth", {
        set: function (value) {
            this._selectedMonth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDateScroller.prototype, "Mode", {
        set: function (value) {
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDateScroller.prototype, "selectedYear", {
        set: function (value) {
            this._selectedYear = value;
        },
        enumerable: true,
        configurable: true
    });
    pgDateScroller.prototype._getMonthForamated = function (value) {
        return moment().month(value).format("MMMM");
    };
    pgDateScroller.prototype._onContentChanges = function () {
        this.alignToElement();
    };
    pgDateScroller.prototype._changeMonthView = function () {
        this.picker._changeMonthView();
    };
    pgDateScroller.prototype._changeMonth = function (value) {
        if (this._selectedMonth > value) {
            this.picker._showMonth = this.picker._showMonth - (this._selectedMonth - value);
        }
        else {
            this.picker._showMonth = this.picker._showMonth + (value - this._selectedMonth);
        }
        this._selectedMonth = value;
    };
    pgDateScroller.prototype.alignToElement = function () {
        // if(this._selectedMonth == 0 || this._selectedMonth == 11){
        //     return;
        // }
        var rect = this._el.querySelector(".wrap-scroller").getBoundingClientRect();
        var offset = this._selectedElement ? this._selectedElement.nativeElement.offsetLeft + 'px' : '0';
        var realOffset = -(parseFloat(offset) - (rect.width / 2 - this._selectedElement.nativeElement.offsetWidth / 2)) + 'px';
        this._renderer.setStyle(this._monthSlider.nativeElement, 'transform', "translate3d(" + realOffset + ", 0px, 0px)");
    };
    __decorate([
        core_1.ViewChild('selectedElement', { static: false }),
        __metadata("design:type", Object)
    ], pgDateScroller.prototype, "_selectedElement", void 0);
    __decorate([
        core_1.ViewChild('monthSlider', { static: true }),
        __metadata("design:type", Object)
    ], pgDateScroller.prototype, "_monthSlider", void 0);
    __decorate([
        core_1.ViewChild('wrapper', { static: true }),
        __metadata("design:type", Object)
    ], pgDateScroller.prototype, "_wrapper", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgDateScroller.prototype, "onDateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], pgDateScroller.prototype, "selectedMonth", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgDateScroller.prototype, "Mode", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], pgDateScroller.prototype, "selectedYear", null);
    pgDateScroller = __decorate([
        core_1.Component({
            selector: 'pg-datepicker-scroller',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n  <div class=\"wrap-scroller\" #wrapper>\n    <div class=\"horizontal-dates\" style=\"position: relative;\" >\n    <div class=\"d-flex flex-row full-width\" #monthSlider  (cdkObserveContent)=\"_onContentChanges()\">\n        <ng-container *ngFor=\"let monthIndex of _List\">\n            <ng-container *ngIf=\"(monthIndex === _selectedMonth || monthIndex == _showMonth); else determineBlock\">\n                <a class=\"month-select selected-date\" title=\"\" #selectedElement  (click)=\"_changeMonthView()\">\n                    {{ _getMonthForamated(monthIndex) }}\n                </a>\n            </ng-container>\n            <ng-template #determineBlock>\n                <a class=\"month-select\" title=\"\" (click)=\"_changeMonth(monthIndex)\">\n                    {{ _getMonthForamated(monthIndex) }}\n                </a>\n            </ng-template>\n        </ng-container>\n        </div>             \n    </div>\n</div>\n  ",
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, datepicker_component_1.pgDatePickerComponent])
    ], pgDateScroller);
    return pgDateScroller;
}());
exports.pgDateScroller = pgDateScroller;
//# sourceMappingURL=datepicker-scroller.component.js.map