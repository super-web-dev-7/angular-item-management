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
var ParallaxDirective = /** @class */ (function () {
    function ParallaxDirective(parallaxEl, renderer) {
        this.parallaxEl = parallaxEl;
        this.renderer = renderer;
        this.scrollElement = "window";
        this.scrollPos = 0;
        this.coverPhotoSpeend = 0.3;
        this.contentSpeed = 0.17;
        this.windowSize = window.innerWidth;
    }
    ParallaxDirective.prototype.ngOnInit = function () {
        this.nativeElement = this.parallaxEl.nativeElement;
        this.registerPageContainerScroller();
    };
    ParallaxDirective.prototype.registerPageContainerScroller = function () {
        var _this = this;
        if (!pg.isHorizontalLayout) {
            return;
        }
        var pageContainer = document.querySelector(".page-container");
        if (pageContainer) {
            this.scrollElement = pageContainer;
            this.renderer.listen(pageContainer, 'scroll', function (event) {
                _this.animate();
            });
        }
    };
    ParallaxDirective.prototype.onResize = function () {
        this.windowSize = window.innerWidth;
    };
    ParallaxDirective.prototype.onWindowScroll = function () {
        this.animate();
    };
    ParallaxDirective.prototype.animate = function () {
        //Disable on mobile;
        if (this.windowSize = window.innerWidth < 1025) {
            return;
        }
        var rect = this.nativeElement.getBoundingClientRect();
        var opacityKeyFrame = rect.width * 50 / 100;
        var direction = 'translateX';
        if (this.scrollElement == "window") {
            this.scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        }
        else {
            this.scrollPos = this.scrollElement.scrollTop;
        }
        direction = 'translateY';
        var styleString = direction + '(' + this.scrollPos * this.coverPhotoSpeend + 'px)';
        this.nativeElement.style.transform = styleString;
        //Legacy Browsers
        this.nativeElement.style.webkitTransform = styleString;
        this.nativeElement.style.mozTransform = styleString;
        this.nativeElement.style.msTransform = styleString;
        if (this.scrollPos > opacityKeyFrame) {
            this.nativeElement.style.opacity = 1 - this.scrollPos / 1200;
        }
        else {
            this.nativeElement.style.opacity = 1;
        }
    };
    __decorate([
        core_1.HostListener("window:resize", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ParallaxDirective.prototype, "onResize", null);
    __decorate([
        core_1.HostListener("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ParallaxDirective.prototype, "onWindowScroll", null);
    ParallaxDirective = __decorate([
        core_1.Directive({
            selector: '[pg-parallax]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], ParallaxDirective);
    return ParallaxDirective;
}());
exports.ParallaxDirective = ParallaxDirective;
//# sourceMappingURL=parallax.directive.js.map