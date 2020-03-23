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
var convert_1 = require("../util/convert");
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(_elementRef) {
        this._elementRef = _elementRef;
        this._showSizeChanger = false;
        this._showTotal = false;
        this._showQuickJumper = false;
        this._simple = false;
        this._current = 1;
        this._pageSize = 10;
        this._firstIndex = 1;
        this._lastIndex = Infinity;
        this._pages = [];
        this._options = [10, 20, 30, 40, 50];
        this.InTable = false;
        this.PageSizeChange = new core_1.EventEmitter();
        this.PageIndexChange = new core_1.EventEmitter();
        this.PageIndexClickChange = new core_1.EventEmitter();
        this._el = this._elementRef.nativeElement;
    }
    Object.defineProperty(PaginationComponent.prototype, "ShowSizeChanger", {
        get: function () {
            return this._showSizeChanger;
        },
        set: function (value) {
            this._showSizeChanger = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "ShowQuickJumper", {
        get: function () {
            return this._showQuickJumper;
        },
        set: function (value) {
            this._showQuickJumper = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "ShowTotal", {
        get: function () {
            return this._showTotal;
        },
        set: function (value) {
            this._showTotal = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "Simple", {
        get: function () {
            return this._simple;
        },
        set: function (value) {
            this._simple = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype._jumpBefore = function (pageSize) {
        this._jumpPage(this._current - Math.round(pageSize / 2));
    };
    PaginationComponent.prototype._jumpAfter = function (pageSize) {
        this._jumpPage(this._current + Math.round(pageSize / 2));
    };
    Object.defineProperty(PaginationComponent.prototype, "PageSizeSelectorValues", {
        /** page size changer select values */
        set: function (value) {
            if (value) {
                this._options = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "PageIndex", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            if (this._current === value) {
                return;
            }
            if (value > this._lastIndex || value < this._firstIndex) {
                return;
            }
            this._current = Number(value);
            this._buildIndexes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "PageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            if (value === this._pageSize) {
                return;
            }
            this._pageSize = value;
            this.PageIndexChange.emit(this.PageIndex);
            this._buildIndexes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "Total", {
        get: function () {
            return this._total;
        },
        set: function (value) {
            if (value === this._total) {
                return;
            }
            this._total = value;
            this._buildIndexes();
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype._pageSizeChange = function ($event) {
        this.PageSize = $event;
        this.PageSizeChange.emit($event);
    };
    PaginationComponent.prototype._PageIndexChange = function ($event) {
        this.PageIndex = $event;
        this.PageIndexChange.emit(this.PageIndex);
    };
    /** generate indexes list */
    PaginationComponent.prototype._buildIndexes = function () {
        this._lastIndex = Math.ceil(this._total / this._pageSize);
        if (this._current > this._lastIndex) {
            this.PageIndex = this._lastIndex;
            this.PageIndexChange.emit(this.PageIndex);
        }
        var tmpPages = [];
        if (this._lastIndex <= 9) {
            for (var i = 2; i <= this._lastIndex - 1; i++) {
                tmpPages.push({ index: i });
            }
        }
        else {
            var current = +this._current;
            var left = Math.max(2, current - 2);
            var right = Math.min(current + 2, this._lastIndex - 1);
            if (current - 1 <= 2) {
                right = 5;
            }
            if (this._lastIndex - current <= 2) {
                left = this._lastIndex - 4;
            }
            for (var i = left; i <= right; i++) {
                tmpPages.push({ index: i });
            }
        }
        this._pages = tmpPages;
    };
    PaginationComponent.prototype._jumpPage = function (index) {
        if (index === this._firstIndex - 1 || index === this._lastIndex + 1 || index === this.PageIndex) {
            return;
        }
        if (index < this._firstIndex) {
            this.PageIndex = this._firstIndex;
        }
        else if (index > this._lastIndex) {
            this.PageIndex = this._lastIndex;
        }
        else {
            this.PageIndex = index;
        }
        this.PageIndexClickChange.emit(this.PageIndex);
        this.PageIndexChange.emit(this.PageIndex);
    };
    Object.defineProperty(PaginationComponent.prototype, "_isLastIndex", {
        get: function () {
            return this._current === this._lastIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "_isFirstIndex", {
        get: function () {
            return this._current === this._firstIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "_roundPageSize", {
        get: function () {
            return Math.round(this._pageSize / 2);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "InTable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "ShowSizeChanger", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "ShowQuickJumper", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "ShowTotal", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "Simple", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "PageSizeChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "PageIndexChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "PageIndexClickChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PaginationComponent.prototype, "PageSizeSelectorValues", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "PageIndex", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "PageSize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "Total", null);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pg-pagination',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: "pagination.component.html",
            styleUrls: ["./pagination.scss"]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map