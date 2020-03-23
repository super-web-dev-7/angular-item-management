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
var overlay_1 = require("@angular/cdk/overlay");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var date_1 = require("./date");
var dropdown_animations_1 = require("../../animations/dropdown-animations");
var overlay_position_map_1 = require("../../utils/overlay-position-map");
var timepicker_inner_component_1 = require("../time-picker/timepicker-inner.component");
var convert_1 = require("../util/convert");
var mesureScrollBar_1 = require("../util/mesureScrollBar");
var pgRangePickerComponent = /** @class */ (function () {
    function pgRangePickerComponent(_elementRef, _cdr) {
        this._elementRef = _elementRef;
        this._cdr = _cdr;
        this._disabled = false;
        this._showTime = null;
        this._now = moment();
        this._oldValue = this._defaultRangeValue;
        this._value = this._defaultRangeValue;
        this._part = date_1.RangePart; // provided to template
        this._disabledDatePart = [null, null];
        this._mode = ['month', 'month'];
        this._selectedMonth = [];
        this._selectedYear = [];
        this._selectedDate = [];
        this._showMonth = [this._now.month(), this._now.clone().add(1, 'month').month()];
        this._showYear = [this._now.year(), this._now.year()];
        this._yearPanel = [];
        this._startDecade = new Array(2).fill(Math.floor(this._showYear[date_1.RangePart.Start] / 10) * 10);
        this._triggerWidth = 0;
        this._dropDownPosition = 'bottom';
        this._positions = overlay_position_map_1.DEFAULT_DATEPICKER_POSITIONS.slice();
        this._offsetX = 0;
        this.onTouched = function () { return null; };
        this.onChange = function () { return null; };
        this.Size = '';
        this.Format = 'YYYY-MM-DD';
        this.AllowClear = true;
        this._el = this._elementRef.nativeElement;
    }
    pgRangePickerComponent_1 = pgRangePickerComponent;
    Object.defineProperty(pgRangePickerComponent.prototype, "_defaultRangeValue", {
        // avoid reference types
        get: function () {
            return [null, null];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "start", {
        get: function () {
            return moment(this._value[date_1.RangePart.Start]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "end", {
        get: function () {
            return moment(this._value[date_1.RangePart.End]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "showClearIcon", {
        get: function () {
            return this._isComplete() && !this.Disabled && this.AllowClear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "ShowTime", {
        get: function () {
            return this._showTime;
        },
        set: function (value) {
            if (typeof value === 'string' || typeof value === 'boolean') {
                this._showTime = convert_1.toBoolean(value) ? {} : null;
            }
            else {
                this._showTime = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
            this._closeCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "Value", {
        get: function () {
            return this._value || this._defaultRangeValue;
        },
        set: function (value) {
            this._updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRangePickerComponent.prototype, "DisabledDate", {
        get: function () {
            return this._disabledDate;
        },
        set: function (value) {
            this._disabledDate = value;
            this._bindDisabledDateToPart();
        },
        enumerable: true,
        configurable: true
    });
    pgRangePickerComponent.prototype.ngOnInit = function () {
        this._generateYearPanel();
    };
    pgRangePickerComponent.prototype._bindDisabledDateToPart = function () {
        // when the mode is month, not needed disable it
        this._disabledDatePart[date_1.RangePart.Start] = this._mode[date_1.RangePart.Start] === 'month' ? null : this._disabledDate;
        this._disabledDatePart[date_1.RangePart.End] = this._mode[date_1.RangePart.End] === 'month' ? null : this._disabledDate;
    };
    pgRangePickerComponent.prototype._generateYearPanel = function () {
        var _t = [];
        for (var i = 0; i < 10; i++) {
            if (i === 1 || i === 4 || i === 7 || i === 9) {
                _t.push(i);
                this._yearPanel.push(_t);
                _t = [];
            }
            else {
                _t.push(i);
            }
        }
        this._yearPanel[0].unshift('start');
        this._yearPanel[3].push('end');
    };
    pgRangePickerComponent.prototype._openCalendar = function () {
        if (this.Disabled) {
            return;
        }
        this._mode = ['month', 'month'];
        this._open = true;
        this._setTriggerWidth();
        this._initShow();
    };
    pgRangePickerComponent.prototype._closeCalendar = function () {
        if (!this._open) {
            return;
        }
        if (this._isComplete()) {
            this._onChange();
        }
        else {
            this._value = this._oldValue.slice();
        }
        this._open = false;
    };
    pgRangePickerComponent.prototype._clearValue = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.Value = this._defaultRangeValue;
        this.onChange(this._value);
    };
    pgRangePickerComponent.prototype._setTriggerWidth = function () {
        this._triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
    };
    pgRangePickerComponent.prototype._setShowYear = function (year, part, $event) {
        $event.stopPropagation();
        this._showYear[part] = year;
        this._mode[part] = 'month';
    };
    pgRangePickerComponent.prototype._isValid = function (part) {
        return moment(this._value[part]).isValid();
    };
    pgRangePickerComponent.prototype._isComplete = function () {
        return this.start.isValid() && this.end.isValid();
    };
    pgRangePickerComponent.prototype._changeTime = function ($event, part) {
        this._value[part] = $event;
    };
    pgRangePickerComponent.prototype._blurInput = function (box, part) {
        if (Date.parse(box.value)) {
            this._value[part] = new Date(box.value);
            this._onChange();
        }
    };
    pgRangePickerComponent.prototype._hoverDay = function (day) {
        if (!this._isComplete() && this._value.some(function (e) { return moment(e).isValid(); })) {
            this.hoveringSelectValue = day.date.toDate();
        }
        else {
            this.hoveringSelectValue = null;
        }
    };
    pgRangePickerComponent.prototype._clickDay = function (day, part) {
        var newDate = day.date.toDate();
        // if have completed, then reset
        if (this._isComplete()) {
            this._value = this._defaultRangeValue;
            this._value[part] = newDate;
            this.rangeValueSort();
            return;
        }
        if (moment(this._value[part]).isValid()) {
            if (part === date_1.RangePart.Start) {
                this._value[date_1.RangePart.End] = newDate;
            }
            else {
                this._value[date_1.RangePart.Start] = newDate;
            }
        }
        else {
            this._value[part] = newDate;
        }
        // the result depends the before step
        if (this._isComplete()) {
            this.rangeValueSort();
            if (!this.ShowTime) {
                this._closeCalendar();
                return;
            }
            this._initShow();
        }
        this.rangeValueSort();
    };
    pgRangePickerComponent.prototype._clickMonth = function (month, part) {
        this._showMonth[part] = month.index;
        this._mode[part] = 'year';
        this._bindDisabledDateToPart();
        this.adjustShowMonth();
    };
    pgRangePickerComponent.prototype._changeTimeView = function ($event) {
        var _this = this;
        $event.stopPropagation();
        this._mode = ['time', 'time'];
        this.setSelectedValue();
        setTimeout(function (_) {
            _this.timePickerInner.forEach(function (e) { return e._initPosition(); });
        });
    };
    pgRangePickerComponent.prototype._changeYearView = function ($event) {
        $event.stopPropagation();
        this._mode = ['year', 'year'];
    };
    pgRangePickerComponent.prototype._showBtn = function (part) {
        if (this._mode[part] === 'month') {
            return true;
        }
        var showStart = moment().month(this._showMonth[date_1.RangePart.Start]).year(this._showYear[date_1.RangePart.Start]);
        var showEnd = moment().month(this._showMonth[date_1.RangePart.End]).year(this._showYear[date_1.RangePart.End]);
        return !showStart.add(1, 'month').isSame(showEnd, 'month');
    };
    pgRangePickerComponent.prototype._preYear = function (part) {
        this._showYear[part] = this._showYear[part] - 1;
        this.adjustShowMonth();
    };
    pgRangePickerComponent.prototype._nextYear = function (part) {
        this._showYear[part] = this._showYear[part] + 1;
        this.adjustShowMonth();
    };
    pgRangePickerComponent.prototype._preMonth = function (part) {
        if (this._showMonth[part] - 1 < 0) {
            this._showMonth[part] = 11;
            this._preYear(part);
        }
        else {
            this._showMonth[part] = this._showMonth[part] - 1;
        }
    };
    pgRangePickerComponent.prototype._nextMonth = function (part) {
        if (this._showMonth[part] + 1 > 11) {
            this._showMonth[part] = 0;
            this._nextYear(part);
        }
        else {
            this._showMonth[part] = this._showMonth[part] + 1;
        }
    };
    pgRangePickerComponent.prototype._preDecade = function (part) {
        this._startDecade[part] = this._startDecade[part] - 10;
    };
    pgRangePickerComponent.prototype._nextDecade = function (part) {
        this._startDecade[part] = this._startDecade[part] + 10;
    };
    pgRangePickerComponent.prototype.rangeValueSort = function () {
        if (this.start.isValid() && this.end.isValid() && this.start.isAfter(this.end)) {
            this._value = this._value.reverse();
        }
        else {
            this._value = this._value.concat();
        }
    };
    pgRangePickerComponent.prototype._initShow = function () {
        if (this.start.isValid()) {
            this._showMonth[date_1.RangePart.Start] = this.start.month();
            this._showYear[date_1.RangePart.Start] = this.start.year();
        }
        else {
            this._showMonth[date_1.RangePart.Start] = this._now.month();
            this._showYear[date_1.RangePart.Start] = this._now.year();
        }
        if (this.end.isValid() && !this.start.isSameOrAfter(this.end, 'month')) {
            this._showMonth[date_1.RangePart.End] = this.end.month();
            this._showYear[date_1.RangePart.End] = this.end.year();
        }
        else {
            var nextMonthOfStart = this.start.clone().add(1, 'month');
            var nextMonthOfNow = this._now.clone().add(1, 'month');
            this._showMonth[date_1.RangePart.End] = this.start.isValid() ? nextMonthOfStart.month() : nextMonthOfNow.month();
            this._showYear[date_1.RangePart.End] = this.start.isValid() ? nextMonthOfStart.year() : nextMonthOfNow.year();
        }
        this._showMonth = this._showMonth.concat();
        this._showYear = this._showYear.concat();
    };
    pgRangePickerComponent.prototype.adjustShowMonth = function () {
        if (this._showYear[date_1.RangePart.Start] === this._showYear[date_1.RangePart.End] && this._showMonth[date_1.RangePart.Start] === this._showMonth[date_1.RangePart.End]) {
            this._nextMonth(date_1.RangePart.End);
        }
    };
    pgRangePickerComponent.prototype.reposition = function () {
        if (typeof window !== 'undefined' && this._open && this._cdkOverlay && this._cdkOverlay.overlayRef) {
            var originElement = this._cdkOverlay.origin.elementRef.nativeElement;
            var overlayElement = this._cdkOverlay.overlayRef.overlayElement;
            var originX = originElement.getBoundingClientRect().x;
            var overlayWidth = overlayElement.getBoundingClientRect().width;
            var margin = window.innerWidth - originX - overlayWidth;
            this._offsetX = margin > 0 ? 0 : margin - (mesureScrollBar_1.measureScrollbar() || 15);
            this._cdr.detectChanges();
        }
    };
    pgRangePickerComponent.prototype.onAttach = function () {
        this.reposition();
    };
    pgRangePickerComponent.prototype.onPositionChange = function (position) {
        this.reposition();
        var _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
        if (this._dropDownPosition !== _position) {
            this._dropDownPosition = _position;
            this._cdr.detectChanges();
        }
    };
    pgRangePickerComponent.prototype.setSelectedValue = function () {
        this._selectedYear = [this.start.year(), this.end.year()];
        this._selectedMonth = [this.start.month(), this.end.month()];
        this._selectedDate = [this.start.date(), this.end.date()];
    };
    pgRangePickerComponent.prototype.isValueChange = function () {
        var _this = this;
        return this._value.some(function (value, index) {
            return _this._oldValue[index] === null
                || (moment.isDate(_this._oldValue[index])
                    && moment.isDate(value)
                    && _this._oldValue[index].getTime() !== value.getTime());
        });
    };
    pgRangePickerComponent.prototype.writeValue = function (value) {
        this._updateValue(value);
    };
    pgRangePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgRangePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgRangePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    pgRangePickerComponent.prototype._updateValue = function (value) {
        if (Array.isArray(value) && value.length === 2) {
            this._value = [value[date_1.RangePart.Start], value[date_1.RangePart.End]];
        }
        else {
            this._value = this._defaultRangeValue;
        }
        this._oldValue = this._value.slice();
    };
    pgRangePickerComponent.prototype._onChange = function () {
        if (this._isValid(date_1.RangePart.Start) && this._isValid(date_1.RangePart.End) && this.isValueChange()) {
            this.onChange(this._value);
            this._oldValue = this._value.slice();
        }
    };
    var pgRangePickerComponent_1;
    __decorate([
        core_1.ViewChild(overlay_1.CdkConnectedOverlay, { static: true }),
        __metadata("design:type", overlay_1.CdkConnectedOverlay)
    ], pgRangePickerComponent.prototype, "_cdkOverlay", void 0);
    __decorate([
        core_1.ViewChild('trigger', { static: true }),
        __metadata("design:type", Object)
    ], pgRangePickerComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgRangePickerComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgRangePickerComponent.prototype, "Format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgRangePickerComponent.prototype, "AllowClear", void 0);
    __decorate([
        core_1.ViewChildren(timepicker_inner_component_1.pgTimePickerInnerComponent),
        __metadata("design:type", core_1.QueryList)
    ], pgRangePickerComponent.prototype, "timePickerInner", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], pgRangePickerComponent.prototype, "ShowTime", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgRangePickerComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], pgRangePickerComponent.prototype, "DisabledDate", null);
    pgRangePickerComponent = pgRangePickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-rangepicker',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                dropdown_animations_1.dropDownAnimation
            ],
            templateUrl: 'rangepicker.component.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgRangePickerComponent_1; }),
                    multi: true
                }
            ],
            styleUrls: ['./datepicker.scss'],
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], pgRangePickerComponent);
    return pgRangePickerComponent;
}());
exports.pgRangePickerComponent = pgRangePickerComponent;
//# sourceMappingURL=rangepicker.component.js.map