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
var pgCardSocial = /** @class */ (function () {
    function pgCardSocial() {
        this._title = "";
        this._titleClass = "text-complete";
        this._type = "text";
        this._comments = "";
        this._likes = "";
        this._body = "";
        this._timestamp = "";
        this._source = "";
        this._image = "";
        this._author = "";
        this._activity = "";
        this._location = "";
        this._additionalClasses = "";
    }
    Object.defineProperty(pgCardSocial.prototype, "Title", {
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "TitleClass", {
        set: function (value) {
            this._titleClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Type", {
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Comments", {
        set: function (value) {
            this._comments = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Likes", {
        set: function (value) {
            this._likes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Body", {
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Timestamp", {
        set: function (value) {
            this._timestamp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Source", {
        set: function (value) {
            this._source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Author", {
        set: function (value) {
            this._author = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Activity", {
        set: function (value) {
            this._activity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Image", {
        set: function (value) {
            this._image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "Location", {
        set: function (value) {
            this._location = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCardSocial.prototype, "AdditionalClasses", {
        set: function (value) {
            this._additionalClasses = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('hostContent', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgCardSocial.prototype, "_hostContent", void 0);
    __decorate([
        core_1.ContentChild('CustomBody', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCardSocial.prototype, "CustomBody", void 0);
    __decorate([
        core_1.ContentChild('AuthorAvatar', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgCardSocial.prototype, "AuthorAvatar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Title", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "TitleClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Type", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Comments", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Likes", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Body", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Timestamp", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Source", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Author", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Activity", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Image", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "Location", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgCardSocial.prototype, "AdditionalClasses", null);
    pgCardSocial = __decorate([
        core_1.Component({
            selector: 'pgcardsocial',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: './card-social.component.html'
        })
    ], pgCardSocial);
    return pgCardSocial;
}());
exports.pgCardSocial = pgCardSocial;
//# sourceMappingURL=card-social.component.js.map