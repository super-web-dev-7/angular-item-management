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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any ordered-imports
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var pgUploadBtnComponent = /** @class */ (function () {
    // endregion
    function pgUploadBtnComponent(http, _el, _renderer, cd) {
        this.http = http;
        this._el = _el;
        this._renderer = _renderer;
        this.cd = cd;
        this.reqs = {};
        this.inited = false;
        this.destroy = false;
        // region: fields
        this.classes = [];
        // region: styles
        this._prefixCls = 'ant-upload';
        this._classList = [];
        if (!http)
            throw new Error("Not found 'HttpClient', You can import 'HttpClientModel' in your root module.");
    }
    // endregion
    pgUploadBtnComponent.prototype.onClick = function () {
        if (this.options.disabled || !this.file)
            return;
        this.file.nativeElement.click();
    };
    pgUploadBtnComponent.prototype.onKeyDown = function (e) {
        if (this.options.disabled)
            return;
        if (e.key === 'Enter') {
            this.onClick();
        }
    };
    pgUploadBtnComponent.prototype.onFileDrop = function (e) {
        var _this = this;
        if (this.options.disabled)
            return;
        if (e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) { return _this.attrAccept(file, _this.options.accept); });
        this.uploadFiles(files);
        e.preventDefault();
    };
    pgUploadBtnComponent.prototype.onChange = function (e) {
        if (this.options.disabled)
            return;
        this.uploadFiles(e.target.files);
        e.target.value = '';
    };
    pgUploadBtnComponent.prototype.attrAccept = function (file, acceptedFiles) {
        if (file && acceptedFiles) {
            var acceptedFilesArray = Array.isArray(acceptedFiles)
                ? acceptedFiles
                : acceptedFiles.split(',');
            var fileName_1 = file.name || '';
            var mimeType_1 = file.type || '';
            var baseMimeType_1 = mimeType_1.replace(/\/.*$/, '');
            return acceptedFilesArray.some(function (type) {
                var validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return fileName_1.toLowerCase().indexOf(validType.toLowerCase(), fileName_1.toLowerCase().length - validType.toLowerCase().length) !== -1;
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType_1 === validType.replace(/\/.*$/, '');
                }
                return mimeType_1 === validType;
            });
        }
        return true;
    };
    pgUploadBtnComponent.prototype.uploadFiles = function (fileList) {
        var _this = this;
        var postFiles = Array.prototype.slice.call(fileList);
        this.options.filters.forEach(function (f) { return postFiles = f.fn(postFiles); });
        postFiles.forEach(function (file) {
            file.uid = Math.random().toString(36).substring(2);
            _this.upload(file, postFiles);
        });
    };
    pgUploadBtnComponent.prototype.upload = function (file, fileList) {
        var _this = this;
        if (!this.options.beforeUpload) {
            return this.post(file);
        }
        var before = this.options.beforeUpload(file, fileList);
        if (before instanceof rxjs_1.Observable) {
            before.subscribe(function (processedFile) {
                var processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    _this.post(processedFile);
                }
                else {
                    _this.post(file);
                }
            }, function (err) {
                // tslint:disable-next-line:no-unused-expression
                console && console.log(err);
            });
        }
        else if (before !== false) {
            return this.post(file);
        }
    };
    pgUploadBtnComponent.prototype.post = function (file) {
        var _this = this;
        if (this.destroy)
            return;
        var opt = this.options;
        var request = opt.customRequest || this.xhr;
        var uid = file.uid;
        var data = opt.data;
        if (typeof data === 'function') {
            data = data(file);
        }
        this.reqs[uid] = (opt.customRequest || this.xhr).call(this, {
            action: opt.action,
            name: opt.name,
            headers: opt.headers,
            file: file,
            data: data,
            withCredentials: opt.withCredentials,
            onProgress: opt.onProgress ? function (e) {
                opt.onProgress(e, file);
            } : null,
            onSuccess: function (ret, xhr) {
                delete _this.reqs[uid];
                opt.onSuccess(ret, file, xhr);
            },
            onError: function (xhr) {
                delete _this.reqs[uid];
                opt.onError(xhr, file);
            }
        });
        opt.onStart(file);
    };
    pgUploadBtnComponent.prototype.xhr = function (args) {
        var _this = this;
        var formData = new FormData();
        formData.append(args.name, args.file);
        if (args.data) {
            Object.keys(args.data).map(function (key) {
                formData.append(key, args.data[key]);
            });
        }
        if (!args.headers)
            args.headers = {};
        if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = "XMLHttpRequest";
        }
        var req = new http_1.HttpRequest('POST', args.action, formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new http_1.HttpHeaders(args.headers)
        });
        return this.http.request(req).subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    event.percent = event.loaded / event.total * 100;
                }
                args.onProgress(event);
            }
            else if (event instanceof http_1.HttpResponse) {
                args.onSuccess(event.body, event);
            }
        }, function (err) {
            _this.abort(args);
            args.onError(err);
        });
    };
    pgUploadBtnComponent.prototype.abort = function (file) {
        var _this = this;
        if (file) {
            var uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (this.reqs[uid]) {
                this.reqs[uid].unsubscribe();
                delete this.reqs[uid];
            }
        }
        else {
            Object.keys(this.reqs).forEach(function (uid) {
                if (_this.reqs[uid]) {
                    _this.reqs[uid].unsubscribe();
                }
                delete _this.reqs[uid];
            });
        }
    };
    pgUploadBtnComponent.prototype._setClassMap = function () {
        var _this = this;
        this._classList.forEach(function (cls) { return _this._renderer.removeClass(_this._el.nativeElement, cls); });
        this._classList = [
            this._prefixCls,
            this.options.disabled && this._prefixCls + "-disabled"
        ].concat(this.classes).filter(function (item) { return !!item; });
        this._classList.forEach(function (cls) { return _this._renderer.addClass(_this._el.nativeElement, cls); });
        this.cd.detectChanges();
    };
    pgUploadBtnComponent.prototype.ngOnInit = function () {
        this.inited = true;
        this._setClassMap();
    };
    pgUploadBtnComponent.prototype.ngOnChanges = function (changes) {
        if (this.inited) {
            this._setClassMap();
        }
    };
    pgUploadBtnComponent.prototype.ngOnDestroy = function () {
        this.destroy = true;
        this.abort();
    };
    __decorate([
        core_1.ViewChild('file', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgUploadBtnComponent.prototype, "file", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], pgUploadBtnComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgUploadBtnComponent.prototype, "options", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], pgUploadBtnComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], pgUploadBtnComponent.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        core_1.HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], pgUploadBtnComponent.prototype, "onFileDrop", null);
    pgUploadBtnComponent = __decorate([
        core_1.Component({
            selector: '[pg-upload-btn]',
            template: "\n  <input type=\"file\" #file (change)=\"onChange($event)\"\n    [attr.accept]=\"options.accept\" [multiple]=\"options.multiple\" style=\"display: none;\">\n  <ng-content></ng-content>\n  ",
            host: {
                '[class.upload]': 'true',
                '[attr.tabindex]': '"0"',
                '[attr.role]': '"button"'
            },
            preserveWhitespaces: false
        }),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [http_1.HttpClient, core_1.ElementRef, core_1.Renderer2, core_1.ChangeDetectorRef])
    ], pgUploadBtnComponent);
    return pgUploadBtnComponent;
}());
exports.pgUploadBtnComponent = pgUploadBtnComponent;
//# sourceMappingURL=upload-btn.component.js.map