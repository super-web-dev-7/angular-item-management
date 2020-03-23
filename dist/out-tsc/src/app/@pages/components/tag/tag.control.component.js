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
var pgTagControl = /** @class */ (function () {
    function pgTagControl() {
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
        this._tags = [];
        this.inputValue = '';
        this._placeholder = '';
    }
    pgTagControl_1 = pgTagControl;
    Object.defineProperty(pgTagControl.prototype, "placeholder", {
        set: function (value) {
            this._placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    pgTagControl.prototype.handleClose = function (removedTag) {
        this._tags = this._tags.filter(function (tag) { return tag !== removedTag; });
    };
    pgTagControl.prototype.sliceTagName = function (tag) {
        var isLongTag = tag.length > 20;
        return isLongTag ? tag.slice(0, 20) + "..." : tag;
    };
    pgTagControl.prototype.handleInputConfirm = function () {
        if (this.inputValue) {
            this._tags.push(this.inputValue);
        }
        this.inputValue = '';
    };
    pgTagControl.prototype.handleFocus = function () {
        this.wrapper.nativeElement.parentNode.parentNode.classList.add('focused');
    };
    pgTagControl.prototype.handleFocusOut = function () {
        this.wrapper.nativeElement.parentNode.parentNode.classList.remove('focused');
    };
    pgTagControl.prototype.handleInputBack = function () {
        if (!this.inputValue) {
            this._tags.splice(-1, 1);
        }
    };
    pgTagControl.prototype.updateValue = function (value) {
        this._tags = value;
    };
    pgTagControl.prototype.writeValue = function (value) {
        this.updateValue(value);
    };
    pgTagControl.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgTagControl.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgTagControl.prototype.ngOnInit = function () {
    };
    var pgTagControl_1;
    __decorate([
        core_1.ViewChild('wrapper', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgTagControl.prototype, "wrapper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTagControl.prototype, "placeholder", null);
    pgTagControl = pgTagControl_1 = __decorate([
        core_1.Component({
            selector: 'pg-tag-control',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgTagControl_1; }),
                    multi: true
                }
            ],
            templateUrl: "./tag.control.component.html",
            styleUrls: ["./tag.scss"]
        })
    ], pgTagControl);
    return pgTagControl;
}());
exports.pgTagControl = pgTagControl;
//# sourceMappingURL=tag.control.component.js.map