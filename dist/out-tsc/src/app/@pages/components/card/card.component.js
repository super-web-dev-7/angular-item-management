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
var animations_1 = require("@angular/animations");
var pgCard = /** @class */ (function () {
    function pgCard() {
        this._isCollapsed = false;
        this._isMaximixed = false;
        this._isLoading = false;
        this._minimalHeader = false;
        this._message = "";
        this._messageType = "danger";
        this._messageVisible = false;
        this._progressType = "circle";
        this._progressColor = "";
        this._showTools = true;
        this._close_card = false;
        this._refresh = true;
        this._refreshColor = 'light';
        this._close = true;
        this._toggle = true;
        this._maximize = true;
        this._timeout = 0;
        this._titleText = "";
        this._type = "default";
        this._extraHeaderClass = "";
        this._extraBodyClass = "";
        this._additionalClasses = "";
        this.onRefresh = new core_1.EventEmitter();
    }
    Object.defineProperty(pgCard.prototype, "Title", {
        get: function () {
            return this._titleText;
        },
        set: function (value) {
            this._titleText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Type", {
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "MinimalHeader", {
        set: function (value) {
            this._minimalHeader = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "ProgressType", {
        set: function (value) {
            this._progressType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "ProgressColor", {
        set: function (value) {
            this._progressColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Refresh", {
        set: function (value) {
            this._refresh = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "RefreshColor", {
        set: function (value) {
            this._refreshColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Maximize", {
        set: function (value) {
            this._maximize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Close", {
        set: function (value) {
            this._close = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Toggle", {
        set: function (value) {
            this._toggle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "HeaderClass", {
        set: function (value) {
            this._extraHeaderClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "BodyClass", {
        set: function (value) {
            this._extraBodyClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "AdditionalClasses", {
        set: function (value) {
            this._additionalClasses = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Controls", {
        set: function (value) {
            this._showTools = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "ShowMessage", {
        set: function (value) {
            this._messageVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Message", {
        set: function (value) {
            this._message = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "Loading", {
        set: function (value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCard.prototype, "TimeOut", {
        set: function (value) {
            this._timeout = value;
        },
        enumerable: true,
        configurable: true
    });
    pgCard.prototype.toggle = function () {
        this._isCollapsed = (this._isCollapsed === true ? false : true);
    };
    pgCard.prototype.maximize = function () {
        var nativeElement = this._hostContent.nativeElement;
        if (this._isMaximixed) {
            this._isMaximixed = false;
            nativeElement.style.left = null;
            nativeElement.style.top = null;
        }
        else {
            this._isMaximixed = true;
            var pagecontainer = document.querySelector(".content");
            console.log(pagecontainer);
            var rect = pagecontainer.getBoundingClientRect();
            var elementRect = nativeElement.getBoundingClientRect();
            var style_1 = window.getComputedStyle(pagecontainer);
            nativeElement.style.left = ((parseFloat(style_1["marginLeft"]) + parseFloat(style_1["paddingLeft"])) + rect.left) + "px";
            nativeElement.style.top = (parseFloat(style_1["padding-top"]) + rect.top) + "px";
        }
    };
    pgCard.prototype.alertDismiss = function () {
        this._messageVisible = false;
    };
    pgCard.prototype.refresh = function () {
        var _this = this;
        if (!this._isLoading) {
            this._isLoading = true;
            this.onRefresh.emit();
        }
        if (this._timeout > 0) {
            setTimeout(function () {
                _this._isLoading = false;
            }, this._timeout);
        }
    };
    pgCard.prototype.close = function () {
        this._close_card = true;
    };
    __decorate([
        core_1.ViewChild('hostContent', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgCard.prototype, "_hostContent", void 0);
    __decorate([
        core_1.ViewChild('minimalCircleLoading', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgCard.prototype, "minimalCircleLoading", void 0);
    __decorate([
        core_1.ViewChild('minimalCircleLoadingTrigger', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgCard.prototype, "minimalCircleLoadingTrigger", void 0);
    __decorate([
        core_1.ContentChild('CardTitle', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCard.prototype, "CardTitle", void 0);
    __decorate([
        core_1.ContentChild('CardExtraControls', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCard.prototype, "CardExtraControls", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "Title", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "Type", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "MinimalHeader", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "ProgressType", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "ProgressColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Refresh", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "RefreshColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Maximize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Close", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Toggle", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "HeaderClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "BodyClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "AdditionalClasses", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Controls", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "ShowMessage", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCard.prototype, "Message", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCard.prototype, "Loading", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], pgCard.prototype, "TimeOut", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgCard.prototype, "onRefresh", void 0);
    pgCard = __decorate([
        core_1.Component({
            selector: 'pgcard',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: './card.component.html',
            animations: [
                animations_1.trigger('collapseState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        height: 0,
                        paddingBottom: '0'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        height: '*',
                        paddingBottom: '*'
                    })),
                    animations_1.transition('inactive => active', animations_1.animate('125ms ease-in')),
                    animations_1.transition('active => inactive', animations_1.animate('125ms ease-out'))
                ]),
                animations_1.trigger('fadeAnimation', [
                    animations_1.state('false', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden',
                    })),
                    animations_1.state('true', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('false => true', animations_1.animate('500ms ease-in')),
                    animations_1.transition('true => false', animations_1.animate('500ms ease-out'))
                ]),
            ],
        })
    ], pgCard);
    return pgCard;
}());
exports.pgCard = pgCard;
//# sourceMappingURL=card.component.js.map