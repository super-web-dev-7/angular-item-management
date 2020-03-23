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
/*
Author : NG-ZORRO
Profile : https://github.com/NG-ZORRO
Repository : https://github.com/NG-ZORRO/ng-zorro-antd
version :
Modifed : Yes
*/
var core_1 = require("@angular/core");
var moment = require("moment");
var convert_1 = require("../util/convert");
var RangePart;
(function (RangePart) {
    RangePart[RangePart["Start"] = 0] = "Start";
    RangePart[RangePart["End"] = 1] = "End";
})(RangePart = exports.RangePart || (exports.RangePart = {}));
var pgCalendarViewComponent = /** @class */ (function () {
    function pgCalendarViewComponent(_elementRef) {
        this._elementRef = _elementRef;
        this._clearTime = true;
        this._datePicker = false;
        this._fullScreen = true;
        this._showHeader = true;
        this._isRange = false;
        this._weeksCalendar = [];
        this._quartersCalendar = [];
        this._listOfWeekName = [];
        this._listOfMonthName = [];
        this._listOfYearName = [];
        this._yearUnit = '0';
        this._monthUnit = '0';
        this._showMonth = moment(new Date()).month();
        this._showYear = moment(new Date()).year();
        this._value = new Date();
        this._rangeValue = [null, null];
        this._locale = 'en';
        this.ClickDay = new core_1.EventEmitter();
        this.ClickMonth = new core_1.EventEmitter();
        this.HoverDay = new core_1.EventEmitter();
        this.ClearTime = true;
        this.Mode = 'month';
        this._el = this._elementRef.nativeElement;
    }
    Object.defineProperty(pgCalendarViewComponent.prototype, "FullScreen", {
        get: function () {
            return this._fullScreen;
        },
        set: function (value) {
            this._fullScreen = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "ShowHeader", {
        get: function () {
            return this._showHeader;
        },
        set: function (value) {
            this._showHeader = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "IsRange", {
        get: function () {
            return this._isRange;
        },
        set: function (value) {
            this._isRange = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "DisabledDate", {
        get: function () {
            return this._disabledDate;
        },
        set: function (value) {
            this._disabledDate = value;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "DatePicker", {
        get: function () {
            return this._datePicker;
        },
        set: function (value) {
            this._datePicker = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "Value", {
        get: function () {
            return this._value || new Date();
        },
        set: function (value) {
            if (this._value === value) {
                return;
            }
            this._value = value || new Date();
            this._showMonth = moment(this._value).month();
            this._showYear = moment(this._value).year();
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "RangeValue", {
        get: function () {
            return this._rangeValue;
        },
        set: function (value) {
            this._rangeValue = value;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "HoveringSelectValue", {
        get: function () {
            return this._hoveringSelectValue;
        },
        set: function (value) {
            if (this._hoveringSelectValue === value) {
                return;
            }
            this._hoveringSelectValue = value;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "ShowYear", {
        get: function () {
            return this._showYear;
        },
        set: function (value) {
            this._showYear = value;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "ShowMonth", {
        get: function () {
            return this._showMonth;
        },
        set: function (value) {
            this._showMonth = value;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCalendarViewComponent.prototype, "Locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            this._locale = value;
            moment.locale(this._locale);
        },
        enumerable: true,
        configurable: true
    });
    pgCalendarViewComponent.prototype._removeTime = function (date) {
        if (this.ClearTime) {
            return date.hour(0).minute(0).second(0).millisecond(0);
        }
        else {
            return date;
        }
    };
    pgCalendarViewComponent.prototype._clickDay = function ($event, day) {
        $event.preventDefault();
        $event.stopPropagation();
        if (day.disabled) {
            return;
        }
        this.ClickDay.emit(day);
    };
    pgCalendarViewComponent.prototype._clickMonth = function ($event, month) {
        $event.preventDefault();
        $event.stopPropagation();
        if (month.disabled) {
            return;
        }
        this.ClickMonth.emit(month);
    };
    pgCalendarViewComponent.prototype._onDayHover = function ($event, day) {
        $event.preventDefault();
        $event.stopPropagation();
        if (day.disabled || day.date.isSame(this._hoveringSelectValue)) {
            return;
        }
        this.HoverDay.emit(day);
    };
    pgCalendarViewComponent.prototype._isSelectedDay = function (date, month) {
        if (this.IsRange) {
            return (date.isSame(this._rangeValue[RangePart.Start], 'day')
                || date.isSame(this._rangeValue[RangePart.End], 'day')
                || date.isSame(this._hoveringSelectValue, 'day'))
                && date.month() === month.month();
        }
        else {
            return date.isSame(this.Value, 'day');
        }
    };
    pgCalendarViewComponent.prototype._isInRange = function (date, month) {
        var ghostDate;
        if (this.IsRange && date.month() === month.month()) {
            if (this._rangeValue.every(function (e) { return moment(e).isValid(); })) {
                return date.isBetween.apply(date, this._rangeValue);
            }
            ghostDate = this._rangeValue.find(function (e) { return moment(e).isValid(); });
            if (ghostDate && this._hoveringSelectValue) {
                var start = moment.min(moment(ghostDate), moment(this._hoveringSelectValue)).toDate();
                var end = moment.max(moment(ghostDate), moment(this._hoveringSelectValue)).toDate();
                return date.isBetween(start, end);
            }
            return false;
        }
        else {
            return false;
        }
    };
    pgCalendarViewComponent.prototype._buildMonth = function (d) {
        var weeks = [];
        var _rawDate = this._removeTime(d);
        var start = _rawDate.clone().date(1).day(0);
        var month = _rawDate.clone();
        var done = false;
        var date = start.clone();
        var monthIndex = date.month();
        var count = 0;
        while (!done) {
            weeks.push({ days: this._buildWeek(date.clone(), month) });
            date.add(1, 'w');
            done = count++ > 4;
            monthIndex = date.month();
        }
        return weeks;
    };
    pgCalendarViewComponent.prototype._buildWeek = function (firstDate, month) {
        var date = firstDate;
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                number: date.date(),
                isLastMonth: date.month() < month.month(),
                isNextMonth: date.month() > month.month(),
                isCurrentDay: date.isSame(new Date(), 'day'),
                isSelectedDay: this._isSelectedDay(date, month),
                isInRange: this._isInRange(date, month),
                title: date.format('YYYY-MM-DD'),
                date: date,
                disabled: this.DisabledDate && this.DisabledDate(date.toDate()),
                firstDisabled: this.DisabledDate && this.DisabledDate(date.toDate()) && (date.day() === 0 || (date.day() !== 0 && this.DisabledDate && !this.DisabledDate(date.clone().subtract(1, 'day').toDate()))),
                lastDisabled: this.DisabledDate && this.DisabledDate(date.toDate()) && (date.day() === 6 || (date.day() !== 6 && this.DisabledDate && !this.DisabledDate(date.clone().add(1, 'day').toDate())))
            });
            date = date.clone();
            date.add(1, 'd');
        }
        return days;
    };
    pgCalendarViewComponent.prototype._buildYears = function (date) {
        var quarters = [];
        var months = [];
        for (var i = 0; i < 12; i++) {
            months.push({
                index: i,
                name: this._listOfMonthName[i],
                year: date.year(),
                isCurrentMonth: moment(new Date()).month() === i && date.isSame(new Date(), 'year'),
                isSelectedMonth: this._showMonth === i,
                disabled: this.DisabledDate && this.DisabledDate(date.month(i).toDate())
            });
            if ((i + 1) % 3 === 0) {
                quarters.push(months);
                months = [];
            }
        }
        return quarters;
    };
    pgCalendarViewComponent.prototype._buildCalendar = function () {
        moment.locale(this._locale);
        this._listOfYearName = this._generateYears(this._showYear);
        this._listOfWeekName = moment.weekdaysMin();
        this._listOfMonthName = moment.monthsShort();
        var date = moment(this.Value).year(this._showYear).month(this._showMonth);
        this._weeksCalendar = this._buildMonth(date);
        this._quartersCalendar = this._buildYears(date);
    };
    pgCalendarViewComponent.prototype._generateYears = function (year) {
        var listOfYears = [];
        for (var _i = 0, _a = Array.from(Array(20).keys()); _i < _a.length; _i++) {
            var i = _a[_i];
            listOfYears.push(i - 10 + year);
        }
        return listOfYears;
    };
    pgCalendarViewComponent.prototype.ngOnInit = function () {
        this._buildCalendar();
    };
    __decorate([
        core_1.ContentChild('dateCell', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCalendarViewComponent.prototype, "dateCell", void 0);
    __decorate([
        core_1.ContentChild('monthCell', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCalendarViewComponent.prototype, "monthCell", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgCalendarViewComponent.prototype, "ClickDay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgCalendarViewComponent.prototype, "ClickMonth", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgCalendarViewComponent.prototype, "HoverDay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgCalendarViewComponent.prototype, "ClearTime", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgCalendarViewComponent.prototype, "Mode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCalendarViewComponent.prototype, "FullScreen", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCalendarViewComponent.prototype, "ShowHeader", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCalendarViewComponent.prototype, "IsRange", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], pgCalendarViewComponent.prototype, "DisabledDate", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('class.pg-patch-full-height'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCalendarViewComponent.prototype, "DatePicker", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], pgCalendarViewComponent.prototype, "Value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], pgCalendarViewComponent.prototype, "RangeValue", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], pgCalendarViewComponent.prototype, "HoveringSelectValue", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], pgCalendarViewComponent.prototype, "ShowYear", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], pgCalendarViewComponent.prototype, "ShowMonth", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCalendarViewComponent.prototype, "Locale", null);
    pgCalendarViewComponent = __decorate([
        core_1.Component({
            selector: 'pg-calendar-view',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'calendar.component.html',
            styleUrls: [
                'calendar.scss'
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], pgCalendarViewComponent);
    return pgCalendarViewComponent;
}());
exports.pgCalendarViewComponent = pgCalendarViewComponent;
//# sourceMappingURL=calendar.component.js.map