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
var forms_1 = require("@angular/forms");
var moment = require("moment");
var dropdown_animations_1 = require("../../animations/dropdown-animations");
var overlay_position_map_1 = require("../../utils/overlay-position-map");
var timepicker_inner_component_1 = require("../time-picker/timepicker-inner.component");
var convert_1 = require("../util/convert");
var pgDatePickerComponent = /** @class */ (function () {
    function pgDatePickerComponent(_elementRef, _cdr, _renderer, _ngZone) {
        this._elementRef = _elementRef;
        this._cdr = _cdr;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._allowClear = true;
        this._disabled = false;
        this._showTime = null;
        this._open = false;
        this._mode = 'year';
        this._dropDownPosition = 'bottom';
        this._placeHolder = 'Select Date';
        this._value = null;
        this._today = new Date();
        this._selectedMonth = moment(this.Value).month();
        this._selectedYear = moment(this.Value).year();
        this._selectedDate = moment(this.Value).date();
        this._showMonth = moment(new Date()).month();
        this._showYear = moment(new Date()).year();
        this._startDecade = Math.floor(this._showYear / 10) * 10;
        this._yearPanel = [];
        this._monthList = [];
        this._positions = overlay_position_map_1.DEFAULT_DATEPICKER_POSITIONS.slice();
        // ngModel Access
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
        this.Format = 'YYYY-MM-DD';
        this.Size = '';
        this.Mode = 'day';
        this.HideFooter = true;
        this._el = this._elementRef.nativeElement;
    }
    pgDatePickerComponent_1 = pgDatePickerComponent;
    Object.defineProperty(pgDatePickerComponent.prototype, "ShowTime", {
        get: function () {
            return this._showTime;
        },
        set: function (value) {
            if (typeof value === 'string' || typeof value === 'boolean') {
                this._showTime = convert_1.toBoolean(value) ? {} : null;
                this.HideFooter = false;
            }
            else {
                this._showTime = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDatePickerComponent.prototype, "Placeholder", {
        set: function (value) {
            this._placeHolder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDatePickerComponent.prototype, "AllowClear", {
        get: function () {
            return this._allowClear;
        },
        set: function (value) {
            this._allowClear = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDatePickerComponent.prototype, "Disabled", {
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
    Object.defineProperty(pgDatePickerComponent.prototype, "DisabledDate", {
        get: function () {
            if (this._mode === 'month' && this.Mode === 'day') {
                return;
            }
            return this._disabledDate;
        },
        set: function (value) {
            this._disabledDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgDatePickerComponent.prototype, "_disabledToday", {
        get: function () {
            if (this._disabledDate) {
                return this._disabledDate(new Date());
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    pgDatePickerComponent.prototype.onPositionChange = function (position) {
        var _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
        if (this._dropDownPosition !== _position) {
            this._dropDownPosition = _position;
            this._cdr.detectChanges();
        }
    };
    Object.defineProperty(pgDatePickerComponent.prototype, "Value", {
        get: function () {
            return this._value || new Date();
        },
        set: function (value) {
            this._updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    pgDatePickerComponent.prototype._changeTime = function ($event) {
        this._value = $event;
    };
    pgDatePickerComponent.prototype._blurInput = function (box) {
        if (Date.parse(box.value)) {
            this.Value = new Date(box.value);
            this.onChange(this._value);
        }
    };
    pgDatePickerComponent.prototype._preYear = function () {
        this._showYear = this._showYear - 1;
    };
    pgDatePickerComponent.prototype._nextYear = function () {
        this._showYear = this._showYear + 1;
    };
    pgDatePickerComponent.prototype._preMonth = function () {
        if (this._showMonth - 1 < 0) {
            this._showMonth = 11;
            this._preYear();
        }
        else {
            this._showMonth = this._showMonth - 1;
        }
    };
    pgDatePickerComponent.prototype._nextMonth = function () {
        if (this._showMonth + 1 > 11) {
            this._showMonth = 0;
            this._nextYear();
        }
        else {
            this._showMonth = this._showMonth + 1;
        }
    };
    pgDatePickerComponent.prototype._setShowYear = function (year, $event) {
        $event.stopPropagation();
        this._showYear = year;
        this._mode = this.Mode === 'day' ? 'year' : 'month';
    };
    pgDatePickerComponent.prototype._preDecade = function () {
        this._startDecade = this._startDecade - 10;
    };
    pgDatePickerComponent.prototype._nextDecade = function () {
        this._startDecade = this._startDecade + 10;
    };
    pgDatePickerComponent.prototype._clearValue = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.Value = null;
        this.onChange(this._value);
    };
    pgDatePickerComponent.prototype._changeToToday = function () {
        if (!this._disabledToday) {
            this.Value = new Date();
            this.onChange(this._value);
            this._closeCalendar();
        }
    };
    pgDatePickerComponent.prototype._clickDay = function (day) {
        if (!this.ShowTime) {
            this._closeCalendar();
            this.Value = day.date.toDate();
            this.onChange(this._value);
        }
        else {
            this.Value = moment(this.Value).year(day.date.year()).month(day.date.month()).date(day.date.date()).toDate();
            this.onChange(this._value);
        }
    };
    pgDatePickerComponent.prototype._clickMonth = function (month) {
        if (this.Mode === 'month') {
            this._closeCalendar();
            this.Value = moment(this.Value).year(this._showYear).month(month.index).toDate();
            this.onChange(this._value);
        }
        else {
            this._showMonth = month.index;
            this._mode = 'year';
        }
    };
    pgDatePickerComponent.prototype._openCalendar = function () {
        if (this.Disabled) {
            return;
        }
        this._mode = this.Mode === 'day' ? 'year' : 'month';
        this._open = true;
    };
    pgDatePickerComponent.prototype._closeCalendar = function () {
        if (!this._open) {
            return;
        }
        if (this.ShowTime) {
            this._updateValue(this._value);
            this.onChange(this._value);
        }
        this._open = false;
    };
    pgDatePickerComponent.prototype._changeMonthView = function () {
        this._mode = 'month';
    };
    pgDatePickerComponent.prototype._changeDecadeView = function ($event) {
        $event.stopPropagation();
        this._mode = 'decade';
    };
    pgDatePickerComponent.prototype._changeTimeView = function ($event) {
        var _this = this;
        $event.stopPropagation();
        this._mode = 'time';
        setTimeout(function (_) {
            _this.timePickerInner._initPosition();
        });
    };
    pgDatePickerComponent.prototype._changeYearView = function ($event) {
        $event.stopPropagation();
        this._mode = 'year';
    };
    Object.defineProperty(pgDatePickerComponent.prototype, "_showClearIcon", {
        get: function () {
            return this._value && !this.Disabled && this.AllowClear;
        },
        enumerable: true,
        configurable: true
    });
    pgDatePickerComponent.prototype._generateYearPanel = function () {
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
    pgDatePickerComponent.prototype.ngOnInit = function () {
        this._generateYearPanel();
    };
    pgDatePickerComponent.prototype.writeValue = function (value) {
        // this.Value = value;
        this._updateValue(value);
    };
    pgDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgDatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgDatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    pgDatePickerComponent.prototype._updateValue = function (value) {
        if (this._value === value) {
            return;
        }
        if (this._disabledDate && this._disabledDate(value)) {
            return;
        }
        this._value = value;
        this._selectedMonth = moment(this.Value).month();
        this._selectedYear = moment(this.Value).year();
        this._selectedDate = moment(this.Value).date();
        this._showYear = moment(this.Value).year();
        this._showMonth = moment(this.Value).month();
        this._startDecade = Math.floor(this._showYear / 10) * 10;
    };
    var pgDatePickerComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgDatePickerComponent.prototype, "Format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgDatePickerComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgDatePickerComponent.prototype, "Mode", void 0);
    __decorate([
        core_1.ViewChild('trigger', { static: true }),
        __metadata("design:type", Object)
    ], pgDatePickerComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.ViewChild(timepicker_inner_component_1.pgTimePickerInnerComponent, { static: false }),
        __metadata("design:type", timepicker_inner_component_1.pgTimePickerInnerComponent)
    ], pgDatePickerComponent.prototype, "timePickerInner", void 0);
    __decorate([
        core_1.ViewChild('monthSlider', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgDatePickerComponent.prototype, "_monthSlider", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], pgDatePickerComponent.prototype, "ShowTime", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], pgDatePickerComponent.prototype, "Placeholder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgDatePickerComponent.prototype, "HideFooter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgDatePickerComponent.prototype, "AllowClear", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgDatePickerComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], pgDatePickerComponent.prototype, "DisabledDate", null);
    pgDatePickerComponent = pgDatePickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-datepicker',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                dropdown_animations_1.dropDownAnimation,
                dropdown_animations_1.scaleInAnimation
            ],
            templateUrl: "datepicker.component.html",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgDatePickerComponent_1; }),
                    multi: true
                }
            ],
            styleUrls: ['./datepicker.scss'],
            host: {
                '[class.ant-calendar-picker]': 'true'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, core_1.Renderer2, core_1.NgZone])
    ], pgDatePickerComponent);
    return pgDatePickerComponent;
}());
exports.pgDatePickerComponent = pgDatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map