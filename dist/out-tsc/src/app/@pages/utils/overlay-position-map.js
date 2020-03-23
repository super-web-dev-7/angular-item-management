"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSITION_MAP = {
    'top': {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    'topCenter': {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    'topLeft': {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    'topRight': {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
    },
    'right': {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
    },
    'rightTop': {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
    },
    'rightBottom': {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
    },
    'bottom': {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
    },
    'bottomCenter': {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
    },
    'bottomLeft': {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
    },
    'bottomRight': {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
    },
    'left': {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
    },
    'leftTop': {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
    },
    'leftBottom': {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
    },
};
// TODO: The whole logic does not make sense here, _objectValues just returns a copy of original array
exports.DEFAULT_4_POSITIONS = _objectValues([exports.POSITION_MAP.top, exports.POSITION_MAP.right, exports.POSITION_MAP.bottom, exports.POSITION_MAP.left]);
exports.DEFAULT_DROPDOWN_POSITIONS = _objectValues([exports.POSITION_MAP.bottomLeft, exports.POSITION_MAP.topLeft]);
exports.DEFAULT_DATEPICKER_POSITIONS = [
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
    },
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
    }
];
function arrayMap(array, iteratee) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
function baseValues(object, props) {
    return arrayMap(props, function (key) {
        return object[key];
    });
}
function _objectValues(object) {
    return object == null ? [] : baseValues(object, Object.keys(object));
}
//# sourceMappingURL=overlay-position-map.js.map