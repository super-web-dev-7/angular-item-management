"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pgGlobalMonitorService = /** @class */ (function () {
    function pgGlobalMonitorService() {
        this.counter = 0;
        this.lastClickPos = {
            x: 0,
            y: 0
        };
        this._navItemSource = new core_1.EventEmitter();
        this._observeGlobalEvents();
    }
    pgGlobalMonitorService.prototype.getGlobalCount = function () {
        return ++this.counter;
    };
    pgGlobalMonitorService.prototype.setDocumentOverflowHidden = function (status) {
        document.body.style.overflow = status ? 'hidden' : '';
    };
    pgGlobalMonitorService.prototype._observeGlobalEvents = function () {
        var _this = this;
        // 监听document的点击事件，记录点击坐标，并抛出 documentClick 事件
        document.addEventListener('click', function (e) {
            _this.lastClickPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this._navItemSource.emit('documentClick');
        });
    };
    return pgGlobalMonitorService;
}());
exports.pgGlobalMonitorService = pgGlobalMonitorService;
exports.default = new pgGlobalMonitorService();
//# sourceMappingURL=pg-global-monitor.js.map