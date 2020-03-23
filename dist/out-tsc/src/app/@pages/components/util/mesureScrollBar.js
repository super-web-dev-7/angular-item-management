"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrollbarWidth;
// Measure scrollbar width for padding body during modal show/hide
var scrollbarMeasure = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px',
    overflow: 'scroll',
};
function measureScrollbar() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    if (scrollbarWidth) {
        return scrollbarWidth;
    }
    var scrollDiv = document.createElement('div');
    for (var scrollProp in scrollbarMeasure) {
        if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
            scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
        }
    }
    document.body.appendChild(scrollDiv);
    var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    scrollbarWidth = width;
    return scrollbarWidth;
}
exports.measureScrollbar = measureScrollbar;
//# sourceMappingURL=mesureScrollBar.js.map