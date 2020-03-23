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
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:ordered-imports no-any
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var convert_1 = require("../util/convert");
var upload_btn_component_1 = require("./upload-btn.component");
var pgUploadComponent = /** @class */ (function () {
    // endregion
    function pgUploadComponent(cd) {
        var _this = this;
        this.cd = cd;
        this.inited = false;
        // region: fields
        this.Type = 'select';
        this.Limit = 0;
        this.Size = 0;
        this.Filter = [];
        this.FileList = [];
        this.FileListChange = new core_1.EventEmitter();
        this._disabled = false;
        this.ListType = 'text';
        this._multiple = false;
        this.Name = 'file';
        this._showUploadList = true;
        this._showBtn = true;
        this._withCredentials = false;
        this.Change = new core_1.EventEmitter();
        this.uploadErrorText = "Error Upload";
        this.onStart = function (file) {
            if (!_this.FileList)
                _this.FileList = [];
            var targetItem = _this.fileToObject(file);
            targetItem.status = 'uploading';
            _this.FileList.push(targetItem);
            _this.genThumb(targetItem);
            _this.FileListChange.emit(_this.FileList);
            _this.Change.emit({ file: targetItem, fileList: _this.FileList });
            // fix ie progress
            if (!window.FormData) {
                _this.autoUpdateProgress(targetItem);
            }
            _this.cd.detectChanges();
        };
        this.onProgress = function (e, file) {
            var fileList = _this.FileList;
            var targetItem = _this.getFileItem(file, fileList);
            // removed
            if (!targetItem)
                return;
            targetItem.percent = e.percent;
            _this.Change.emit({
                event: e,
                file: __assign({}, targetItem),
                fileList: _this.FileList,
            });
            _this.cd.detectChanges();
        };
        this.onSuccess = function (res, file, xhr) {
            _this.clearProgressTimer();
            var fileList = _this.FileList;
            var targetItem = _this.getFileItem(file, fileList);
            // removed
            if (!targetItem)
                return;
            targetItem.status = 'complete';
            targetItem.response = res;
            _this.Change.emit({
                file: __assign({}, targetItem),
                fileList: fileList,
            });
            _this.cd.detectChanges();
        };
        this.onError = function (err, file) {
            _this.clearProgressTimer();
            var fileList = _this.FileList;
            var targetItem = _this.getFileItem(file, fileList);
            // removed
            if (!targetItem)
                return;
            targetItem.error = err;
            targetItem.status = 'error';
            targetItem.message = _this.genErr(file);
            _this.Change.emit({
                file: __assign({}, targetItem),
                fileList: fileList,
            });
            _this.cd.detectChanges();
        };
        // endregion
        // region: list
        this.onRemove = function (file) {
            _this.upload.abort(file);
            file.status = 'removed';
            (_this.Remove ? _this.Remove instanceof rxjs_1.Observable ? _this.Remove : rxjs_1.of(_this.Remove(file)) : rxjs_1.of(true))
                .pipe(operators_1.filter(function (res) { return res; }))
                .subscribe(function (res) {
                var removedFileList = _this.removeFileItem(file, _this.FileList);
                if (removedFileList) {
                    _this.FileList = removedFileList;
                    _this.Change.emit({
                        file: file,
                        fileList: removedFileList
                    });
                    _this.FileListChange.emit(_this.FileList);
                    _this.cd.detectChanges();
                }
            });
        };
        // endregion
        // region: styles
        this._prefixCls = 'upload';
        this._classList = [];
    }
    Object.defineProperty(pgUploadComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgUploadComponent.prototype, "Multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgUploadComponent.prototype, "ShowUploadList", {
        get: function () {
            return this._showUploadList;
        },
        set: function (value) {
            this._showUploadList = typeof value === 'boolean' ? convert_1.toBoolean(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgUploadComponent.prototype, "ShowButton", {
        get: function () {
            return this._showBtn;
        },
        set: function (value) {
            this._showBtn = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgUploadComponent.prototype, "WithCredentials", {
        get: function () {
            return this._withCredentials;
        },
        set: function (value) {
            this._withCredentials = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgUploadComponent.prototype.zipOptions = function () {
        var _this = this;
        if (typeof this.ShowUploadList === 'boolean' && this.ShowUploadList) {
            this.ShowUploadList = {
                showPreviewIcon: true,
                showRemoveIcon: true
            };
        }
        // filters
        var filters = this.Filter.slice();
        if (this.Multiple && this.Limit > 0 && filters.findIndex(function (w) { return w.name === 'limit'; }) === -1) {
            filters.push({
                name: 'limit',
                fn: function (fileList) { return fileList.slice(-_this.Limit); }
            });
        }
        if (this.Size > 0 && filters.findIndex(function (w) { return w.name === 'size'; }) === -1) {
            filters.push({
                name: 'size',
                fn: function (fileList) { return fileList.filter(function (w) { return (w.size / 1024) <= _this.Size; }); }
            });
        }
        if (this.FileType && this.FileType.length > 0 && filters.findIndex(function (w) { return w.name === 'type'; }) === -1) {
            var types_1 = this.FileType.split(',');
            filters.push({
                name: 'type',
                fn: function (fileList) { return fileList.filter(function (w) { return ~types_1.indexOf(w.type); }); }
            });
        }
        this._btnOptions = {
            disabled: this.Disabled,
            accept: this.Accept,
            action: this.Action,
            beforeUpload: this.BeforeUpload,
            customRequest: this.CustomRequest,
            data: this.Data,
            headers: this.Headers,
            name: this.Name,
            multiple: this.Multiple,
            withCredentials: this.WithCredentials,
            filters: filters,
            onStart: this.onStart,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            onError: this.onError
        };
        return this;
    };
    // region: upload
    pgUploadComponent.prototype.fileToObject = function (file) {
        return {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.filename || file.name,
            size: file.size,
            type: file.type,
            uid: file.uid,
            response: file.response,
            error: file.error,
            percent: 0,
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            originFileObj: file
        };
    };
    pgUploadComponent.prototype.getFileItem = function (file, fileList) {
        var matchKey = file.uid !== undefined ? 'uid' : 'name';
        return fileList.filter(function (item) { return item[matchKey] === file[matchKey]; })[0];
    };
    pgUploadComponent.prototype.removeFileItem = function (file, fileList) {
        var matchKey = file.uid !== undefined ? 'uid' : 'name';
        var removed = fileList.filter(function (item) { return item[matchKey] !== file[matchKey]; });
        if (removed.length === fileList.length) {
            return null;
        }
        return removed;
    };
    pgUploadComponent.prototype.genErr = function (file) {
        return file.response && typeof file.response === 'string' ?
            file.response :
            (file.error && file.error.statusText) || this.uploadErrorText;
    };
    pgUploadComponent.prototype.clearProgressTimer = function () {
        clearInterval(this.progressTimer);
    };
    pgUploadComponent.prototype.genPercentAdd = function () {
        var k = 0.1;
        var i = 0.01;
        var end = 0.98;
        return function (s) {
            var start = s;
            if (start >= end) {
                return start;
            }
            start += k;
            k = k - i;
            if (k < 0.001) {
                k = 0.001;
            }
            return start * 100;
        };
    };
    pgUploadComponent.prototype.autoUpdateProgress = function (file) {
        var _this = this;
        var getPercent = this.genPercentAdd();
        var curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(function () {
            curPercent = getPercent(curPercent);
            _this.onProgress({
                percent: curPercent,
            }, file);
        }, 200);
    };
    pgUploadComponent.prototype.genThumb = function (file) {
        if (typeof document === 'undefined' ||
            typeof window === 'undefined' ||
            !window.FileReader || !window.File ||
            !(file.originFileObj instanceof File) ||
            file.thumbUrl !== undefined) {
            return;
        }
        file.thumbUrl = '';
        var reader = new FileReader();
        reader.onloadend = function (e) {
            file.thumbUrl = reader.result;
        };
        reader.readAsDataURL(file.originFileObj);
    };
    pgUploadComponent.prototype.fileDrop = function (e) {
        if (e.type === this.dragState)
            return;
        this.dragState = e.type;
        this._setClassMap();
    };
    pgUploadComponent.prototype._setClassMap = function () {
        var isDrag = this.Type === 'drag';
        var subCls = [];
        if (this.Type === 'drag') {
            subCls = [
                this.FileList.some(function (file) { return file.status === 'uploading'; }) && this._prefixCls + "-drag-uploading",
                this.dragState === 'dragover' && this._prefixCls + "-drag-hover"
            ];
        }
        else {
            subCls = [
                this._prefixCls + "-select-" + this.ListType
            ];
        }
        this._classList = [
            this._prefixCls,
            this._prefixCls + "-" + this.Type
        ].concat(subCls, [
            this.Disabled && this._prefixCls + "-disabled"
        ]).filter(function (item) { return !!item; });
        this.cd.detectChanges();
    };
    // endregion
    pgUploadComponent.prototype.ngOnInit = function () {
        this.inited = true;
    };
    pgUploadComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.FileList)
            (this.FileList || []).forEach(function (file) { return file.message = _this.genErr(file); });
        this.zipOptions()._setClassMap();
    };
    pgUploadComponent.prototype.ngOnDestroy = function () {
        this.clearProgressTimer();
    };
    __decorate([
        core_1.ViewChild('upload', { static: false }),
        __metadata("design:type", upload_btn_component_1.pgUploadBtnComponent)
    ], pgUploadComponent.prototype, "upload", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "Type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgUploadComponent.prototype, "Limit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgUploadComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "FileType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "Accept", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "Action", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "progressType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadComponent.prototype, "BeforeUpload", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadComponent.prototype, "CustomRequest", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgUploadComponent.prototype, "Data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], pgUploadComponent.prototype, "Filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], pgUploadComponent.prototype, "FileList", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgUploadComponent.prototype, "FileListChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgUploadComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgUploadComponent.prototype, "Headers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "ListType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgUploadComponent.prototype, "extraClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgUploadComponent.prototype, "Multiple", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgUploadComponent.prototype, "Name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], pgUploadComponent.prototype, "ShowUploadList", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgUploadComponent.prototype, "ShowButton", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgUploadComponent.prototype, "WithCredentials", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadComponent.prototype, "Remove", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgUploadComponent.prototype, "Preview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgUploadComponent.prototype, "Change", void 0);
    pgUploadComponent = __decorate([
        core_1.Component({
            selector: 'pg-upload',
            templateUrl: "./upload.component.html",
            styleUrls: [
                './upload.scss',
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            preserveWhitespaces: false,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], pgUploadComponent);
    return pgUploadComponent;
}());
exports.pgUploadComponent = pgUploadComponent;
//# sourceMappingURL=upload.component.js.map