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
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var message_container_component_1 = require("./message-container.component");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(_messageContainer) {
        this._messageContainer = _messageContainer;
        this._eraseTimer = null;
    }
    MessageComponent.prototype.ngOnInit = function () {
        this._options = this.Message.options;
        if (this._options.Animate) {
            this.Message.state = 'enter';
        }
        this._autoErase = this._options.Duration > 0;
        if (this._autoErase) {
            this._initErase();
            this._startEraseTimeout();
        }
        this._enableHorizontalContainer = pg.isHorizontalLayout;
    };
    MessageComponent.prototype.ngOnDestroy = function () {
        if (this._autoErase) {
            this._clearEraseTimeout();
        }
    };
    MessageComponent.prototype.onEnter = function () {
        if (this._autoErase && this._options.PauseOnHover) {
            this._clearEraseTimeout();
            this._updateTTL();
        }
    };
    MessageComponent.prototype.onLeave = function () {
        if (this._autoErase && this._options.PauseOnHover) {
            this._startEraseTimeout();
        }
    };
    MessageComponent.prototype.onClickClose = function () {
        this._destroy();
    };
    // Remove self
    MessageComponent.prototype._destroy = function () {
        var _this = this;
        if (this._options.Animate) {
            this.Message.state = 'leave';
            setTimeout(function () { return _this._messageContainer.removeMessage(_this.Message.messageId); }, 200);
        }
        else {
            this._messageContainer.removeMessage(this.Message.messageId);
        }
    };
    MessageComponent.prototype._initErase = function () {
        this._eraseTTL = this._options.Duration;
        this._eraseTimingStart = Date.now();
    };
    MessageComponent.prototype._updateTTL = function () {
        if (this._autoErase) {
            this._eraseTTL -= Date.now() - this._eraseTimingStart;
        }
    };
    MessageComponent.prototype._startEraseTimeout = function () {
        var _this = this;
        if (this._eraseTTL > 0) {
            this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
            this._eraseTimer = window.setTimeout(function () { return _this._destroy(); }, this._eraseTTL);
            this._eraseTimingStart = Date.now();
        }
        else {
            this._destroy();
        }
    };
    MessageComponent.prototype._clearEraseTimeout = function () {
        if (this._eraseTimer !== null) {
            window.clearTimeout(this._eraseTimer);
            this._eraseTimer = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MessageComponent.prototype, "Message", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MessageComponent.prototype, "Index", void 0);
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'pg-message',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                animations_1.trigger('enterLeave', [
                    animations_1.state('enter', animations_1.style({ opacity: 1, transform: 'translateY(0)' })),
                    animations_1.transition('* => enter', [
                        animations_1.style({ opacity: 0, transform: 'translateY(-50%)' }),
                        animations_1.animate('100ms linear')
                    ]),
                    animations_1.state('leave', animations_1.style({ opacity: 0, transform: 'translateY(-50%)' })),
                    animations_1.transition('* => leave', [
                        animations_1.style({ opacity: 1, transform: 'translateY(0)' }),
                        animations_1.animate('100ms linear')
                    ]),
                ])
            ],
            templateUrl: 'message.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [message_container_component_1.MessageContainerComponent])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map