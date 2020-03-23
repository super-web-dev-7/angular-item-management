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
Object.defineProperty(exports, "__esModule", { value: true });
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var message_container_component_1 = require("./message-container.component");
// TODO: remove MessageData generic type as it has no contributon in typing
var MessageBaseService = /** @class */ (function () {
    function MessageBaseService(overlay, containerClass, _idPrefix) {
        var _this = this;
        if (_idPrefix === void 0) { _idPrefix = ''; }
        this._idPrefix = _idPrefix;
        this._counter = 0; // Id counter for messages
        //Wait till wrapper gets init parameters
        setTimeout(function () {
            _this._container = overlay.create().attach(new portal_1.ComponentPortal(containerClass)).instance;
        }, 100);
    }
    MessageBaseService.prototype.remove = function (messageId) {
        if (messageId) {
            this._container.removeMessage(messageId);
        }
        else {
            this._container.removeMessageAll();
        }
    };
    MessageBaseService.prototype.createMessage = function (message, options) {
        // TODO: spread on literal has been disallow on latest proposal
        var resultMessage = __assign({}, message, {
            messageId: this._generateMessageId(),
            options: options,
            createdAt: new Date()
        });
        this._container.createMessage(resultMessage);
        return resultMessage;
    };
    MessageBaseService.prototype._generateMessageId = function () {
        return this._idPrefix + this._counter++;
    };
    return MessageBaseService;
}());
exports.MessageBaseService = MessageBaseService;
var MessageService = /** @class */ (function (_super) {
    __extends(MessageService, _super);
    function MessageService(overlay) {
        return _super.call(this, overlay, message_container_component_1.MessageContainerComponent, 'message-') || this;
    }
    // Shortcut methods
    MessageService.prototype.success = function (content, options) {
        return this.createMessage({ type: 'success', content: content }, options);
    };
    MessageService.prototype.error = function (content, options) {
        return this.createMessage({ type: 'error', content: content }, options);
    };
    MessageService.prototype.info = function (content, options) {
        return this.createMessage({ type: 'info', content: content }, options);
    };
    MessageService.prototype.warning = function (content, options) {
        return this.createMessage({ type: 'warning', content: content }, options);
    };
    MessageService.prototype.create = function (type, content, options) {
        return this.createMessage({ type: type, content: content }, options);
    };
    MessageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [overlay_1.Overlay])
    ], MessageService);
    return MessageService;
}(MessageBaseService));
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map