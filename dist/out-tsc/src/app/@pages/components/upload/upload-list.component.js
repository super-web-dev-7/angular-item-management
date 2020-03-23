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
// tslint:disable:ordered-imports no-any
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var pgUploadListComponent = /** @class */ (function () {
    // endregion
    function pgUploadListComponent(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        // endregion
        // region: styles
        this._prefixCls = 'upload-list';
        this._classList = [];
        // endregion
        // region: render
        this.locale = {
            uploading: "Uploading",
            previewFile: "Preview File",
            removeFile: "Remove File",
        };
    }
    pgUploadListComponent.prototype._setClassMap = function () {
        var _this = this;
        this._classList.forEach(function (cls) { return _this._renderer.removeClass(_this._el.nativeElement, cls); });
        this._classList = [
            this._prefixCls,
            this._prefixCls + "-" + this.listType
        ].filter(function (item) { return !!item; });
        this._classList.forEach(function (cls) { return _this._renderer.addClass(_this._el.nativeElement, cls); });
    };
    pgUploadListComponent.prototype.handlePreview = function (file, e) {
        if (!this.onPreview)
            return;
        e.preventDefault();
        return this.onPreview(file);
    };
    pgUploadListComponent.prototype.handleClose = function (file) {
        if (this.onRemove)
            this.onRemove(file);
    };
    pgUploadListComponent.prototype.ngOnInit = function () {
    };
    pgUploadListComponent.prototype.ngOnChanges = function (changes) {
        this._setClassMap();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadListComponent.prototype, "listType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], pgUploadListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgUploadListComponent.prototype, "icons", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadListComponent.prototype, "progressType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadListComponent.prototype, "onPreview", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadListComponent.prototype, "onRemove", void 0);
    pgUploadListComponent = __decorate([
        core_1.Component({
            selector: 'pg-upload-list',
            template: "\n  <div *ngFor=\"let file of items\" class=\"list-group-item upload-{{file.status}}\" @itemState>\n    <ng-template #icon>\n      <ng-container *ngIf=\"listType === 'picture' || listType === 'picture-card'; else defIcon\">\n        <ng-container *ngIf=\"file.status === 'uploading' || (!file.thumbUrl && !file.url); else thumbIcon\">\n          <div *ngIf=\"listType === 'picture-card'\" class=\"upload-list-item-uploading-text\">{{ locale.uploading }}</div>\n          <i *ngIf=\"listType !== 'picture-card'\" class=\"anticon anticon-picture upload-list-item-thumbnail\"></i>\n        </ng-container>\n      </ng-container>\n      <ng-template #defIcon>\n        <pg-progress *ngIf=\"file.status === 'uploading'\" type=\"circle\" indeterminate=\"true\"></pg-progress>\n        <i *ngIf=\"file.status !== 'uploading'\" class=\"fa fa-paperclip p-l-5 p-r-5\"></i>\n      </ng-template>\n      <ng-template #thumbIcon>\n        <a class=\"img-thumbnail\" target=\"_blank\" rel=\"noopener noreferrer\"\n          [href]=\"file.thumbUrl || file.url\"\n          (click)=\"handlePreview(file, $event)\">\n          <img [src]=\"file.thumbUrl || file.url\" [attr.alt]=\"file.name\" />\n        </a>\n      </ng-template>\n    </ng-template>\n    <ng-template #preview>\n      <ng-container *ngIf=\"file.url; else prevText\">\n        <a [href]=\"file.thumbUrl || file.url\" target=\"_blank\" rel=\"noopener noreferrer\"\n          (click)=\"handlePreview(file, $event)\" class=\"list-item-name\" title=\"{{ file.name }}\">{{ file.name }}</a>\n      </ng-container>\n      <ng-template #prevText>\n        <span (click)=\"handlePreview(file, $event)\" class=\"list-item-name\" title=\"{{ file.name }}\">{{ file.name }}</span>\n      </ng-template>\n    </ng-template>\n    <div class=\"list-group-item-inner justify-content-between\">\n    <div class=\"d-flex\">\n      <ng-template [ngTemplateOutlet]=\"icon\"></ng-template>\n      <ng-template [ngTemplateOutlet]=\"preview\"></ng-template>\n    </div>\n    <ng-container *ngIf=\"listType === 'picture-card' && file.status !== 'uploading'; else cross\">\n      <span class=\"upload-list-item-actions\">\n        <a *ngIf=\"icons.showPreviewIcon\" [href]=\"file.thumbUrl || file.url\"\n          target=\"_blank\" rel=\"noopener noreferrer\"\n          title=\"{{ locale.previewFile }}\"\n          [ngStyle]=\"!(file.url || file.thumbUrl) && {'opacity': .5, 'pointer-events': 'none'}\"\n          (click)=\"handlePreview(file, $event)\">\n            <i class=\"fa fa-eye\"></i>\n        </a>\n        <i *ngIf=\"icons.showRemoveIcon\" (click)=\"handleClose(file)\" class=\"pg pg-close\" title=\"{{ locale.removeFile }}\"></i>\n      </span>\n    </ng-container>\n    <ng-template #cross>\n      <i *ngIf=\"icons.showRemoveIcon\" (click)=\"handleClose(file)\" class=\"pg pg-close\" title=\"{{ locale.removeFile }}\"></i>\n    </ng-template>\n    </div>\n    <div *ngIf=\"file.status === 'uploading' && progressType !== 'circle';\" class=\"item-progress\">\n      <div *ngIf=\"listType === 'picture-card';else determineBlock\">\n        <pg-progress type=\"circle\" indeterminate=\"true\"></pg-progress>\n      </div>\n      <ng-template #determineBlock>\n        <pg-progress *ngIf=\"file.percent == 0\" type=\"bar\" indeterminate=\"true\"></pg-progress>\n        <pg-progress *ngIf=\"file.percent != 0\" type=\"bar\" indeterminate=\"false\" value=\"file.percent\"></pg-progress>\n      </ng-template>\n    </div>\n  </div>\n  ",
            animations: [
                animations_1.trigger('itemState', [
                    animations_1.transition(':enter', [
                        animations_1.style({ height: '0', width: '0', opacity: 0 }),
                        animations_1.animate(150, animations_1.style({ height: '*', width: '*', opacity: 1 }))
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.animate(150, animations_1.style({ height: '0', width: '0', opacity: 0 }))
                    ])
                ])
            ],
            host: {
                '[class.list-group]': 'true',
                '[class.upload-list]': 'true'
            },
            preserveWhitespaces: false
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], pgUploadListComponent);
    return pgUploadListComponent;
}());
exports.pgUploadListComponent = pgUploadListComponent;
//# sourceMappingURL=upload-list.component.js.map