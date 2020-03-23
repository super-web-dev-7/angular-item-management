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
/*
* Author : NG-ZORRO - ANT UI
* Github : https://github.com/NG-ZORRO/ng-zorro-antd
* Copyright Reserved : MIT LICENSE
* Modified : Ace Revox
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var convert_1 = require("../util/convert");
var slider_marks_component_1 = require("./slider-marks.component");
var slider_service_1 = require("./slider.service");
var SliderHandle = /** @class */ (function () {
    function SliderHandle() {
    }
    return SliderHandle;
}());
exports.SliderHandle = SliderHandle;
var pgSliderComponent = /** @class */ (function () {
    // |--------------------------------------------------------------------------------------------
    // | Lifecycle hooks
    // |--------------------------------------------------------------------------------------------
    function pgSliderComponent(utils) {
        this.utils = utils;
        this._color = "";
        // Debugging
        this.DebugId = null; // set this id will print debug informations to console
        // Static configurations (properties that can only specify once)
        this.Step = 1;
        this.Marks = null;
        this.Min = 0;
        this.Max = 100;
        this.DefaultValue = null;
        this.Tooltip = false;
        this.OnAfterChange = new core_1.EventEmitter();
        // Inside properties
        this._disabled = false;
        this._dots = false;
        this._included = true;
        this._range = false;
        this._vertical = false;
        this.value = null; // CORE value state
        this.cacheSliderStart = null;
        this.cacheSliderLength = null;
        this.prefixCls = 'pg-slider';
        this.activeValueIndex = null; // Current activated handle's index ONLY for range=true
        this.track = { offset: null, length: null }; // Track's offset and length
        this.bounds = { lower: null, upper: null }; // now for pg-slider-step
        this.isDragging = false; // Current dragging state
    }
    pgSliderComponent_1 = pgSliderComponent;
    Object.defineProperty(pgSliderComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        // Dynamic property settings
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "TooltipForceVisiblity", {
        set: function (value) {
            //this._showHandleTooltip(this.Range ? this.activeValueIndex : 0);
            this._toolTipForce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Range", {
        get: function () {
            return this._range;
        },
        set: function (value) {
            this._range = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Dots", {
        get: function () {
            return this._dots;
        },
        set: function (value) {
            this._dots = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    // |--------------------------------------------------------------------------------------------
    // | value accessors & ngModel accessors
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.setValue = function (val, isWriteValue) {
        if (isWriteValue === void 0) { isWriteValue = false; }
        if (isWriteValue) { // [ngModel-writeValue]: Formatting before setting value, always update current value, but trigger onValueChange ONLY when the "formatted value" not equals "input value"
            this.value = this.formatValue(val);
            this.log("[ngModel:setValue/writeValue]Update track & handles");
            this.updateTrackAndHandles();
            // if (!this.isValueEqual(this.value, val)) {
            //   this.log(`[ngModel:setValue/writeValue]onValueChange`, val);
            //   if (this.onValueChange) { // NOTE: onValueChange will be unavailable when writeValue() called at the first time
            //     this.onValueChange(this.value);
            //   }
            // }
        }
        else { // [Normal]: setting value, ONLY check changed, then update and trigger onValueChange
            if (!this.isValueEqual(this.value, val)) {
                this.value = val;
                this.log("[Normal:setValue]Update track & handles");
                this.updateTrackAndHandles();
                this.log("[Normal:setValue]onValueChange", val);
                if (this.onValueChange) { // NOTE: onValueChange will be unavailable when writeValue() called at the first time
                    this.onValueChange(this.value);
                }
            }
        }
    };
    pgSliderComponent.prototype.getValue = function (cloneAndSort) {
        if (cloneAndSort === void 0) { cloneAndSort = false; }
        // TODO: using type guard, remove type cast
        if (cloneAndSort && this.Range) { // clone & sort range values
            return this.utils.cloneArray(this.value).sort(function (a, b) { return a - b; });
        }
        return this.value;
    };
    // clone & sort current value and convert them to offsets, then return the new one
    pgSliderComponent.prototype.getValueToOffset = function (value) {
        var _this = this;
        var normalizedValue = value;
        if (typeof normalizedValue === 'undefined') {
            normalizedValue = this.getValue(true);
        }
        // TODO: using type guard, remove type cast
        return this.Range ?
            normalizedValue.map(function (val) { return _this.valueToOffset(val); }) :
            this.valueToOffset(normalizedValue);
    };
    pgSliderComponent.prototype.writeValue = function (val) {
        if (typeof this.onValueChange !== 'function') {
            return;
        } // ignore the first initial call
        this.log("[ngModel/writeValue]current writing value = ", val);
        this.setValue(val, true);
    };
    pgSliderComponent.prototype.registerOnChange = function (fn) {
        this.onValueChange = fn;
    };
    pgSliderComponent.prototype.registerOnTouched = function (fn) { };
    pgSliderComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
        this.toggleDragDisabled(isDisabled);
        this.setClassMap();
    };
    // initialize event binding, class init, etc. (called only once)
    pgSliderComponent.prototype.ngOnInit = function () {
        // initial checking
        this.checkValidValue(this.DefaultValue); // check DefaultValue
        // default handles
        this.handles = this._generateHandles(this.Range ? 2 : 1);
        // initialize
        this.sliderDOM = this.slider.nativeElement;
        if (this.getValue() === null) {
            this.setValue(this.formatValue(null));
        } // init with default value
        this.marksArray = this.Marks === null ? null : this.toMarksArray(this.Marks);
        // event bindings
        this.createDrag();
        // initialize drag's disabled status
        this.toggleDragDisabled(this.Disabled);
        // the first time to init classes
        this.setClassMap();
        if (this._toolTipForce) {
            this._showHandleTooltip(this.Range ? this.activeValueIndex : 0);
        }
    };
    pgSliderComponent.prototype.ngOnChanges = function (changes) {
        var Disabled = changes.Disabled, Marks = changes.Marks;
        if (Disabled && !Disabled.firstChange) {
            this.toggleDragDisabled(Disabled.currentValue);
            this.setClassMap();
        }
        else if (Marks && !Marks.firstChange) {
            this.marksArray = this.Marks ? this.toMarksArray(this.Marks) : null;
        }
    };
    pgSliderComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeDrag();
    };
    // |--------------------------------------------------------------------------------------------
    // | Basic flow functions
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.setClassMap = function () {
        var _a;
        this.classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this._color] = true,
            _a[this.prefixCls + "-disabled"] = this.Disabled,
            _a[this.prefixCls + "-vertical"] = this.Vertical,
            _a[this.prefixCls + "-with-marks"] = this.marksArray ? this.marksArray.length : 0,
            _a);
    };
    // find the cloest value to be activated (only for range = true)
    pgSliderComponent.prototype.setActiveValueIndex = function (pointerValue) {
        if (this.Range) {
            var minimal_1 = null;
            var gap_1;
            var activeIndex_1;
            // TODO: using type guard, remove type cast
            this.getValue().forEach(function (val, index) {
                gap_1 = Math.abs(pointerValue - val);
                if (minimal_1 === null || gap_1 < minimal_1) {
                    minimal_1 = gap_1;
                    activeIndex_1 = index;
                }
            });
            this.activeValueIndex = activeIndex_1;
        }
    };
    pgSliderComponent.prototype.setActiveValue = function (pointerValue) {
        if (this.Range) {
            // TODO: using type guard, remove type cast
            var newValue = this.utils.cloneArray(this.value);
            newValue[this.activeValueIndex] = pointerValue;
            this.setValue(newValue);
        }
        else {
            this.setValue(pointerValue);
        }
    };
    pgSliderComponent.prototype.updateTrackAndHandles = function () {
        var _this = this;
        var value = this.getValue();
        var offset = this.getValueToOffset(value);
        var valueSorted = this.getValue(true);
        var offsetSorted = this.getValueToOffset(valueSorted);
        var boundParts = this.Range ? valueSorted : [0, valueSorted];
        var trackParts = this.Range ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]] : [0, offsetSorted];
        this.handles.forEach(function (handle, index) {
            handle.offset = _this.Range ? offset[index] : offset;
            handle.value = _this.Range ? value[index] : value;
        });
        this.bounds.lower = boundParts[0], this.bounds.upper = boundParts[1];
        this.track.offset = trackParts[0], this.track.length = trackParts[1];
    };
    pgSliderComponent.prototype.toMarksArray = function (marks) {
        var marksArray = [];
        for (var key in marks) {
            var mark = marks[key];
            var val = typeof key === 'number' ? key : parseFloat(key);
            if (val < this.Min || val > this.Max) {
                continue;
            }
            marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
        }
        return marksArray;
    };
    // |--------------------------------------------------------------------------------------------
    // | Event listeners & bindings
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.onDragStart = function (value) {
        this.log('[onDragStart]dragging value = ', value);
        this.toggleDragMoving(true);
        // cache DOM layout/reflow operations
        this.cacheSliderProperty();
        // trigger drag start
        this.setActiveValueIndex(value);
        this.setActiveValue(value);
        // Tooltip visibility of handles
        if (this.Tooltip) {
            this._showHandleTooltip(this.Range ? this.activeValueIndex : 0);
        }
    };
    pgSliderComponent.prototype.onDragMove = function (value) {
        this.log('[onDragMove]dragging value = ', value);
        // trigger drag moving
        this.setActiveValue(value);
    };
    pgSliderComponent.prototype.onDragEnd = function () {
        this.log('[onDragEnd]');
        this.toggleDragMoving(false);
        this.OnAfterChange.emit(this.getValue(true));
        // remove cache DOM layout/reflow operations
        this.cacheSliderProperty(true);
        // Hide all tooltip
        this._hideAllHandleTooltip();
    };
    pgSliderComponent.prototype.createDrag = function () {
        var _this = this;
        var sliderDOM = this.sliderDOM;
        var orientField = this.Vertical ? 'pageY' : 'pageX';
        // TODO: using named interface
        var mouse = {
            start: 'mousedown', move: 'mousemove', end: 'mouseup',
            pluckKey: [orientField]
        };
        var touch = {
            start: 'touchstart', move: 'touchmove', end: 'touchend',
            pluckKey: ['touches', '0', orientField],
            filter: function (e) { return !_this.utils.isNotTouchEvent(e); }
        };
        // make observables
        [mouse, touch].forEach(function (source) {
            // TODO: remove any
            // TODO: filterFunc doesn't match filter in touch, should be checked
            /* tslint:disable-next-line:no-any */
            var _a = source, start = _a.start, move = _a.move, end = _a.end, pluckKey = _a.pluckKey, _b = _a.filterFunc, filterFunc = _b === void 0 ? (function () { return true; }) : _b;
            // start
            source.startPlucked$ = rxjs_1.fromEvent(sliderDOM, start).pipe(operators_1.filter(filterFunc), operators_1.tap(_this.utils.pauseEvent), operators_1.pluck.apply(void 0, pluckKey), operators_1.map(function (position) { return _this.findClosestValue(position); }));
            // end
            source.end$ = rxjs_1.fromEvent(document, end);
            // resolve move
            source.moveResolved$ = rxjs_1.fromEvent(document, move).pipe(operators_1.filter(filterFunc), operators_1.tap(_this.utils.pauseEvent), operators_1.pluck.apply(void 0, pluckKey), operators_1.distinctUntilChanged(), operators_1.map(function (position) { return _this.findClosestValue(position); }), operators_1.distinctUntilChanged(), operators_1.takeUntil(source.end$));
            // merge to become moving
            // source.move$ = source.startPlucked$.mergeMapTo(source.moveResolved$);
        });
        // merge mouse and touch observables
        this.dragstart$ = rxjs_1.merge(mouse.startPlucked$, touch.startPlucked$);
        // this.dragmove$ = Observable.merge(mouse.move$, touch.move$);
        this.dragmove$ = rxjs_1.merge(mouse.moveResolved$, touch.moveResolved$);
        this.dragend$ = rxjs_1.merge(mouse.end$, touch.end$);
    };
    pgSliderComponent.prototype.subscribeDrag = function (periods) {
        if (periods === void 0) { periods = ['start', 'move', 'end']; }
        this.log('[subscribeDrag]this.dragstart$ = ', this.dragstart$);
        if (periods.indexOf('start') !== -1 && this.dragstart$ && !this.dragstart_) {
            this.dragstart_ = this.dragstart$.subscribe(this.onDragStart.bind(this));
        }
        if (periods.indexOf('move') !== -1 && this.dragmove$ && !this.dragmove_) {
            this.dragmove_ = this.dragmove$.subscribe(this.onDragMove.bind(this));
        }
        if (periods.indexOf('end') !== -1 && this.dragend$ && !this.dragend_) {
            this.dragend_ = this.dragend$.subscribe(this.onDragEnd.bind(this));
        }
    };
    pgSliderComponent.prototype.unsubscribeDrag = function (periods) {
        if (periods === void 0) { periods = ['start', 'move', 'end']; }
        this.log('[unsubscribeDrag]this.dragstart_ = ', this.dragstart_);
        if (periods.indexOf('start') !== -1 && this.dragstart_) {
            this.dragstart_.unsubscribe();
            this.dragstart_ = null;
        }
        if (periods.indexOf('move') !== -1 && this.dragmove_) {
            this.dragmove_.unsubscribe();
            this.dragmove_ = null;
        }
        if (periods.indexOf('end') !== -1 && this.dragend_) {
            this.dragend_.unsubscribe();
            this.dragend_ = null;
        }
    };
    pgSliderComponent.prototype.toggleDragMoving = function (movable) {
        var periods = ['move', 'end'];
        if (movable) {
            this.isDragging = true;
            this.subscribeDrag(periods);
        }
        else {
            this.isDragging = false;
            this.unsubscribeDrag(periods);
        }
    };
    pgSliderComponent.prototype.toggleDragDisabled = function (disabled) {
        if (disabled) {
            this.unsubscribeDrag();
        }
        else {
            this.subscribeDrag(['start']);
        }
    };
    // |--------------------------------------------------------------------------------------------
    // | Util functions (tools)
    // |--------------------------------------------------------------------------------------------
    // find the closest value depend on pointer's position
    pgSliderComponent.prototype.findClosestValue = function (position) {
        var sliderStart = this.getSliderStartPosition();
        var sliderLength = this.getSliderLength();
        var ratio = this.utils.correctNumLimit((position - sliderStart) / sliderLength, 0, 1);
        var val = (this.Max - this.Min) * (this.Vertical ? 1 - ratio : ratio) + this.Min;
        var points = (this.Marks === null ? [] : Object.keys(this.Marks).map(parseFloat));
        // push closest step
        if (this.Step !== null && !this.Dots) {
            var closestOne = Math.round(val / this.Step) * this.Step;
            points.push(closestOne);
        }
        // calculate gaps
        var gaps = points.map(function (point) { return Math.abs(val - point); });
        var closest = points[gaps.indexOf(Math.min.apply(Math, gaps))];
        // return the fixed
        return this.Step === null ? closest :
            parseFloat(closest.toFixed(this.utils.getPrecision(this.Step)));
    };
    pgSliderComponent.prototype.valueToOffset = function (value) {
        return this.utils.valueToOffset(this.Min, this.Max, value);
    };
    pgSliderComponent.prototype.getSliderStartPosition = function () {
        if (this.cacheSliderStart !== null) {
            return this.cacheSliderStart;
        }
        var offset = this.utils.getElementOffset(this.sliderDOM);
        return this.Vertical ? offset.top : offset.left;
    };
    pgSliderComponent.prototype.getSliderLength = function () {
        if (this.cacheSliderLength !== null) {
            return this.cacheSliderLength;
        }
        var sliderDOM = this.sliderDOM;
        return this.Vertical ?
            sliderDOM.clientHeight : sliderDOM.clientWidth;
    };
    // cache DOM layout/reflow operations for performance (may not necessary?)
    pgSliderComponent.prototype.cacheSliderProperty = function (remove) {
        if (remove === void 0) { remove = false; }
        this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
        this.cacheSliderLength = remove ? null : this.getSliderLength();
    };
    pgSliderComponent.prototype.formatValue = function (value) {
        var _this = this;
        var res = value;
        if (!this.checkValidValue(value)) { // if empty, use default value
            res = this.DefaultValue === null ?
                (this.Range ? [this.Min, this.Max] : this.Min) : this.DefaultValue;
        }
        else { // format
            // TODO: using type guard, remove type cast
            res = this.Range ?
                value.map(function (val) { return _this.utils.correctNumLimit(val, _this.Min, _this.Max); }) :
                this.utils.correctNumLimit(value, this.Min, this.Max);
        }
        return res;
    };
    // check if value is valid and throw error if value-type/range not match
    pgSliderComponent.prototype.checkValidValue = function (value) {
        var range = this.Range;
        if (value === null || value === undefined) {
            return false;
        } // it's an invalid value, just return
        var isArray = Array.isArray(value);
        if (!Array.isArray(value)) {
            var parsedValue = value;
            if (typeof value !== 'number') {
                parsedValue = parseFloat(value);
            }
            if (isNaN(parsedValue)) {
                return false;
            } // it's an invalid value, just return
        }
        if (isArray !== !!range) { // value type not match
            throw new Error("The \"Range\" can't match the \"Value\"'s type, please check these properties: \"Range\", \"Value\", \"DefaultValue\".");
        }
        return true;
    };
    pgSliderComponent.prototype.isValueEqual = function (value, val) {
        if (typeof value !== typeof val) {
            return false;
        }
        if (Array.isArray(value)) {
            var len = value.length;
            for (var i = 0; i < len; i++) {
                if (value[i] !== val[i]) {
                    return false;
                }
            }
            return true;
        }
        else {
            return value === val;
        }
    };
    // print debug info
    // TODO: should not kept in component
    /* tslint:disable-next-line:no-any */
    pgSliderComponent.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.DebugId !== null) {
            var args = ["[pg-slider][#" + this.DebugId + "] "].concat(Array.prototype.slice.call(arguments));
            console.log.apply(null, args);
        }
    };
    // Show one handle's tooltip and hide others'
    pgSliderComponent.prototype._showHandleTooltip = function (handleIndex) {
        var _this = this;
        if (handleIndex === void 0) { handleIndex = 0; }
        this.handles.forEach(function (handle, index) {
            _this.handles[index].active = index === handleIndex;
        });
    };
    pgSliderComponent.prototype._hideAllHandleTooltip = function () {
        if (!this._showHandleTooltip)
            this.handles.forEach(function (handle) { return handle.active = false; });
    };
    pgSliderComponent.prototype._generateHandles = function (amount) {
        var handles = [];
        for (var i = 0; i < amount; i++) {
            handles.push({ offset: null, value: null, active: false });
        }
        return handles;
    };
    var pgSliderComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "DebugId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Step", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", slider_marks_component_1.Marks)
    ], pgSliderComponent.prototype, "Marks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "DefaultValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], pgSliderComponent.prototype, "Tooltip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgSliderComponent.prototype, "TipFormatter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "OnAfterChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Vertical", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "TooltipForceVisiblity", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Range", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Dots", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Included", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSliderComponent.prototype, "Color", null);
    __decorate([
        core_1.ViewChild('slider', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSliderComponent.prototype, "slider", void 0);
    pgSliderComponent = pgSliderComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-slider',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgSliderComponent_1; }),
                    multi: true
                }],
            template: "\n    <div #slider [ngClass]=\"classMap\" >\n      <div class=\"pg-slider-rail\"></div>\n      <pg-slider-track\n        ClassName=\"{{prefixCls}}-track\"\n        [Vertical]=\"Vertical\"\n        [Included]=\"Included\"\n        [Offset]=\"track.offset\"\n        [Length]=\"track.length\"\n      ></pg-slider-track>\n      <pg-slider-step *ngIf=\"marksArray\"\n        PrefixCls=\"{{prefixCls}}\"\n        [Vertical]=\"Vertical\"\n        [LowerBound]=\"bounds.lower\"\n        [UpperBound]=\"bounds.upper\"\n        [MarksArray]=\"marksArray\"\n        [Included]=\"Included\"\n      ></pg-slider-step>\n      <pg-slider-handle\n        *ngFor=\"let handle of handles;\"\n        ClassName=\"{{prefixCls}}-handle\"\n        [Vertical]=\"Vertical\"\n        [Offset]=\"handle.offset\"\n        [Value]=\"handle.value\"\n        [Active]=\"handle.active\"\n        [TipFormatter]=\"TipFormatter\"\n      ></pg-slider-handle>\n      <pg-slider-marks *ngIf=\"marksArray\"\n        ClassName=\"{{prefixCls}}-mark\"\n        [Vertical]=\"Vertical\"\n        [Min]=\"Min\"\n        [Max]=\"Max\"\n        [LowerBound]=\"bounds.lower\"\n        [UpperBound]=\"bounds.upper\"\n        [MarksArray]=\"marksArray\"\n        [Included]=\"Included\"\n      ></pg-slider-marks>\n    </div>\n  ",
            styleUrls: [
                './slider.scss'
            ]
        }),
        __metadata("design:paramtypes", [slider_service_1.SliderService])
    ], pgSliderComponent);
    return pgSliderComponent;
}());
exports.pgSliderComponent = pgSliderComponent;
//# sourceMappingURL=slider.component.js.map