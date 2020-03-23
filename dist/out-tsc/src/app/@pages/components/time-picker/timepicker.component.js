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
var convert_1 = require("../util/convert");
var timepicker_inner_component_1 = require("./timepicker-inner.component");
var pgTimePickerComponent = /** @class */ (function (_super) {
    __extends(pgTimePickerComponent, _super);
    function pgTimePickerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timePickerDisabled = false;
        _this._dropDownPosition = 'bottom';
        _this._positions = overlay_position_map_1.DEFAULT_DATEPICKER_POSITIONS.slice();
        return _this;
    }
    pgTimePickerComponent_1 = pgTimePickerComponent;
    Object.defineProperty(pgTimePickerComponent.prototype, "Disabled", {
        get: function () {
            return this._timePickerDisabled;
        },
        set: function (value) {
            this._timePickerDisabled = convert_1.toBoolean(value);
            this._closeCalendar();
        },
        enumerable: true,
        configurable: true
    });
    pgTimePickerComponent.prototype.onPositionChange = function (position) {
        var _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
        if (this._dropDownPosition !== _position) {
            this._dropDownPosition = _position;
            this._cdr.detectChanges();
        }
    };
    pgTimePickerComponent.prototype._manualChangeInput = function (box) {
        var _tempMoment = moment(box.value, this._format);
        if (Date.parse(_tempMoment.toDate().toString())) {
            this.Value = new Date((moment(this._value).hour(_tempMoment.hour()).minute(_tempMoment.minute()).second(_tempMoment.second())).toDate().getTime());
            this.onChange(this._value);
        }
        // this._closeCalendar();
    };
    pgTimePickerComponent.prototype._overHour = function () {
        var _start = this._format.indexOf('HH');
        var _end = _start + 2;
        this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
    };
    pgTimePickerComponent.prototype._overMinute = function () {
        var _start = this._format.indexOf('mm');
        var _end = _start + 2;
        this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
    };
    pgTimePickerComponent.prototype._overSecond = function () {
        var _start = this._format.indexOf('ss');
        var _end = _start + 2;
        this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
    };
    pgTimePickerComponent.prototype._clearValue = function () {
        this.Value = null;
        this._selectedHour = null;
        this._selectedMinute = null;
        this.onChange(this._value);
        this._selectedSecond = null;
    };
    pgTimePickerComponent.prototype._openCalendar = function () {
        var _this = this;
        this._open = true;
        setTimeout(function (_) {
            _this._initPosition();
            _this._inputTimeInstance.nativeElement.setSelectionRange(0, 8);
        });
    };
    pgTimePickerComponent.prototype._closeCalendar = function () {
        if (!this._open) {
            return;
        }
        this._open = false;
    };
    pgTimePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    var pgTimePickerComponent_1;
    __decorate([
        core_1.ViewChild('trigger', { static: true }),
        __metadata("design:type", Object)
    ], pgTimePickerComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTimePickerComponent.prototype, "Disabled", null);
    pgTimePickerComponent = pgTimePickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-timepicker',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                dropdown_animations_1.dropDownAnimation
            ],
            templateUrl: "timepicker.component.html",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgTimePickerComponent_1; }),
                    multi: true
                }
            ],
            styleUrls: ['./timepicker.scss']
        })
    ], pgTimePickerComponent);
    return pgTimePickerComponent;
}(timepicker_inner_component_1.pgTimePickerInnerComponent));
exports.pgTimePickerComponent = pgTimePickerComponent;
//# sourceMappingURL=timepicker.component.js.map