"use strict";
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_config_1 = require("./message-config");
var MessageContainerComponent = /** @class */ (function () {
    function MessageContainerComponent(defaultConfig, config) {
        this.messages = [];
        this.currentMessage = null;
        this.config = __assign({}, defaultConfig, config);
        console.log(this.currentMessage);
    }
    // Create a new message
    MessageContainerComponent.prototype.createMessage = function (message) {
        var el = window.document.querySelector(".header ");
        if (el) {
            var rect = el.getBoundingClientRect();
            this.style = {
                marginTop: rect.height + "px"
            };
        }
        this.currentMessage = message;
        if (this.messages.length >= this.config.MaxStack) {
            this.messages.splice(0, 1);
        }
        message.options = this._mergeMessageOptions(message.options);
        this.messages.push(message);
    };
    // Remove a message by messageId
    MessageContainerComponent.prototype.removeMessage = function (messageId) {
        var _this = this;
        this.messages.some(function (message, index) {
            if (message.messageId === messageId) {
                _this.messages.splice(index, 1);
                return true;
            }
        });
    };
    // Remove all messages
    MessageContainerComponent.prototype.removeMessageAll = function () {
        this.messages = [];
    };
    // Merge default options and cutom message options
    MessageContainerComponent.prototype._mergeMessageOptions = function (options) {
        var defaultOptions = {
            Duration: this.config.Duration,
            Animate: this.config.Animate,
            PauseOnHover: this.config.PauseOnHover
        };
        return __assign({}, defaultOptions, options);
    };
    MessageContainerComponent = __decorate([
        core_1.Component({
            selector: 'pg-message-container',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div class=\"pgn-wrapper\" [class.hide]=\"messages.length == 0\" *ngIf=\"currentMessage\" [attr.data-position]=\"currentMessage.options.Position\" [ngStyle]=\"style\">\n      <pg-message *ngFor=\"let message of messages; let i = index\" [Message]=\"message\" [Index]=\"i\"></pg-message>\n    </div>\n  ",
            styleUrls: []
        }),
        __param(0, core_1.Optional()), __param(0, core_1.Inject(message_config_1._MESSAGE_DEFAULT_CONFIG)),
        __param(1, core_1.Optional()), __param(1, core_1.Inject(message_config_1._MESSAGE_CONFIG)),
        __metadata("design:paramtypes", [Object, Object])
    ], MessageContainerComponent);
    return MessageContainerComponent;
}());
exports.MessageContainerComponent = MessageContainerComponent;
//# sourceMappingURL=message-container.component.js.map