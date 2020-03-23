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
/**
 * complex but work well
 * TODO: rebuild latter
 */
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dropdown_animations_1 = require("../../animations/dropdown-animations");
var tag_animations_1 = require("../../animations/tag-animations");
//import { LocaleService } from '../locale/index';
var convert_1 = require("../util/convert");
var option_pipe_1 = require("./option.pipe");
var pgSelectFXComponent = /** @class */ (function () {
    function pgSelectFXComponent(_elementRef, _renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._allowClear = false;
        this._disabled = false;
        this._isTags = false;
        this._isMultiple = false;
        this._keepUnListOptions = false;
        this._isOpen = false;
        this._prefixCls = 'pg-select';
        this._classList = [];
        this._dropDownPrefixCls = this._prefixCls + "-dropdown";
        this._selectionPrefixCls = this._prefixCls + "-selection";
        this._placeholder = 'placeholder';
        this._notFoundContent = "No Content";
        this._searchText = '';
        this._triggerWidth = 0;
        this._selectedOptions = new Set();
        this._options = [];
        this._cacheOptions = [];
        this._filterOptions = [];
        this._tagsOptions = [];
        this._isMultiInit = false;
        this._dropDownPosition = 'bottom';
        this._composing = false;
        this._backDropStyles = {
            "transform": 'scale3d(1,1,1)'
        };
        this._openBackdrop = false;
        // ngModel Access
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
        this.SearchChange = new core_1.EventEmitter();
        this.OpenChange = new core_1.EventEmitter();
        this.ScrollToBottom = new core_1.EventEmitter();
        this.Filter = true;
        this.MaxMultiple = Infinity;
        /** new -option insert or new tags insert */
        this.addOption = function (option) {
            _this._options.push(option);
            if (!_this._isTags) {
                if (option.Value) {
                    _this.updateSelectedOption(_this._value);
                }
                else {
                    _this.forceUpdateSelectedOption(_this._value);
                }
            }
        };
        /** cancel select multiple option */
        this.unSelectMultipleOption = function (option, $event, emitChange) {
            if (emitChange === void 0) { emitChange = true; }
            _this._operatingMultipleOption = option;
            _this._selectedOptions.delete(option);
            if (emitChange) {
                _this.emitMultipleOptions();
            }
            // 对Tag进行特殊处理
            if (_this._isTags && (_this._options.indexOf(option) !== -1) && (_this._tagsOptions.indexOf(option) !== -1)) {
                _this.removeOption(option);
                _this._tagsOptions.splice(_this._tagsOptions.indexOf(option), 1);
            }
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }
        };
        this._el = this._elementRef.nativeElement;
    }
    pgSelectFXComponent_1 = pgSelectFXComponent;
    Object.defineProperty(pgSelectFXComponent.prototype, "AllowClear", {
        get: function () {
            return this._allowClear;
        },
        set: function (value) {
            this._allowClear = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "KeepUnListOptions", {
        get: function () {
            return this._keepUnListOptions;
        },
        set: function (value) {
            this._keepUnListOptions = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Mode", {
        set: function (value) {
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Multiple", {
        get: function () {
            return this._isMultiple;
        },
        set: function (value) {
            this._isMultiple = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "PlaceHolder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "NotFoundContent", {
        get: function () {
            return this._notFoundContent;
        },
        set: function (value) {
            this._notFoundContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = { large: 'lg', small: 'sm' }[value];
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Tags", {
        get: function () {
            return this._isTags;
        },
        set: function (value) {
            var isTags = convert_1.toBoolean(value);
            this._isTags = isTags;
            this.Multiple = isTags;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
            this.closeDropDown();
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectFXComponent.prototype, "Open", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            var _this = this;
            var isOpen = convert_1.toBoolean(value);
            if (this._isOpen === isOpen) {
                setTimeout(function () {
                    _this._backDropStyles = {
                        "transform": 'scale3d(1,1,1)'
                    };
                });
                return;
            }
            if (isOpen) {
                this.scrollToActive();
                this._setTriggerWidth();
                var contentHeight = this.csOptions.nativeElement.offsetHeight;
                var originalHeight = this.placeHolder.nativeElement.offsetHeight;
                var contentWidth = this.csOptions.nativeElement.offsetWidth;
                var originalWidth = this.placeHolder.nativeElement.offsetWidth;
                var scaleV = contentHeight / originalHeight;
                var scaleH = (contentWidth > originalWidth) ? contentWidth / originalWidth : 1.05;
                setTimeout(function () {
                    _this._openBackdrop = true;
                    _this._backDropStyles = {
                        "transform": 'scale3d(' + 1 + ', ' + scaleV + ', 1)'
                    };
                });
            }
            this._isOpen = isOpen;
            this.OpenChange.emit(this._isOpen);
            this.setClassMap();
            if (this._isOpen) {
                setTimeout(function () {
                    _this.checkDropDownScroll();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /** -option remove or tags remove */
    pgSelectFXComponent.prototype.removeOption = function (option) {
        this._options.splice(this._options.indexOf(option), 1);
        if (!this._isTags) {
            this.forceUpdateSelectedOption(this._value);
        }
    };
    /** dropdown position changed */
    pgSelectFXComponent.prototype.onPositionChange = function (position) {
        this._dropDownPosition = position.connectionPair.originY;
    };
    pgSelectFXComponent.prototype.compositionStart = function () {
        this._composing = true;
    };
    pgSelectFXComponent.prototype.compositionEnd = function () {
        this._composing = false;
    };
    /** clear single selected option */
    pgSelectFXComponent.prototype.clearSelect = function ($event) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this._selectedOption = null;
        this.Value = null;
        this.onChange(null);
    };
    /** click dropdown option by user */
    pgSelectFXComponent.prototype.clickOption = function (option, $event) {
        if (!option) {
            return;
        }
        this.chooseOption(option, true, $event);
        this.closeDropDown();
    };
    /** choose option */
    pgSelectFXComponent.prototype.chooseOption = function (option, isUserClick, $event) {
        if (isUserClick === void 0) { isUserClick = false; }
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this._activeFilterOption = option;
        if (option && !option.Disabled) {
            if (!this.Multiple) {
                this._selectedOption = option;
                this._value = option.Value;
                if (isUserClick) {
                    this.onChange(option.Value);
                }
            }
            else {
                if (isUserClick) {
                    this.isInSet(this._selectedOptions, option) ? this.unSelectMultipleOption(option) : this.selectMultipleOption(option);
                }
            }
        }
    };
    pgSelectFXComponent.prototype.updateWidth = function (element, text) {
        var _this = this;
        if (text) {
            /** wait for scroll width change */
            setTimeout(function (_) {
                _this._renderer.setStyle(element, 'width', element.scrollWidth + "px");
            });
        }
        else {
            this._renderer.removeStyle(element, 'width');
        }
    };
    /** determine if option in set */
    pgSelectFXComponent.prototype.isInSet = function (set, option) {
        return (Array.from(set).find(function (data) { return data.Value === option.Value; }));
    };
    /** select multiple option */
    pgSelectFXComponent.prototype.selectMultipleOption = function (option, $event) {
        /** if tags do push to tag option */
        if (this._isTags && (this._options.indexOf(option) === -1) && (this._tagsOptions.indexOf(option) === -1)) {
            this.addOption(option);
            this._tagsOptions.push(option);
        }
        this._operatingMultipleOption = option;
        if (this._selectedOptions.size < this.MaxMultiple) {
            this._selectedOptions.add(option);
        }
        this.emitMultipleOptions();
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    };
    /** emit multiple options */
    pgSelectFXComponent.prototype.emitMultipleOptions = function () {
        if (this._isMultiInit) {
            return;
        }
        var arrayOptions = Array.from(this._selectedOptions);
        this._value = arrayOptions.map(function (item) { return item.Value; });
        this.onChange(this._value);
    };
    /** update selected option when add remove option etc */
    pgSelectFXComponent.prototype.updateSelectedOption = function (currentModelValue, triggerByNgModel) {
        var _this = this;
        if (triggerByNgModel === void 0) { triggerByNgModel = false; }
        if (currentModelValue == null) {
            return;
        }
        if (this.Multiple) {
            var selectedOptions = this._options.filter(function (item) {
                return (item != null) && (currentModelValue.indexOf(item.Value) !== -1);
            });
            if ((this.KeepUnListOptions || this.Tags) && (!triggerByNgModel)) {
                var _selectedOptions_1 = Array.from(this._selectedOptions);
                selectedOptions.forEach(function (option) {
                    var _exist = _selectedOptions_1.some(function (item) { return item._value === option._value; });
                    if (!_exist) {
                        _this._selectedOptions.add(option);
                    }
                });
            }
            else {
                this._selectedOptions = new Set();
                selectedOptions.forEach(function (option) {
                    _this._selectedOptions.add(option);
                });
            }
        }
        else {
            var selectedOption = this._options.filter(function (item) {
                return (item != null) && (item.Value === currentModelValue);
            });
            this.chooseOption(selectedOption[0]);
        }
    };
    pgSelectFXComponent.prototype.forceUpdateSelectedOption = function (value) {
        var _this = this;
        /** trigger dirty check */
        setTimeout(function (_) {
            _this.updateSelectedOption(value);
        });
    };
    Object.defineProperty(pgSelectFXComponent.prototype, "Value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSelectFXComponent.prototype.clearAllSelectedOption = function (emitChange) {
        var _this = this;
        if (emitChange === void 0) { emitChange = true; }
        this._selectedOptions.forEach(function (item) {
            _this.unSelectMultipleOption(item, null, emitChange);
        });
    };
    pgSelectFXComponent.prototype.handleKeyEnterEvent = function (event) {
        /** when composing end */
        if (!this._composing && this._isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this.updateFilterOption(false);
            this.clickOption(this._activeFilterOption);
        }
    };
    pgSelectFXComponent.prototype.handleKeyBackspaceEvent = function (event) {
        if ((!this._searchText) && (!this._composing) && (this._isMultiple)) {
            event.preventDefault();
            var lastOption = Array.from(this._selectedOptions).pop();
            this.unSelectMultipleOption(lastOption);
        }
    };
    pgSelectFXComponent.prototype.handleKeyDownEvent = function ($event) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.nextOption(this._activeFilterOption, this._filterOptions.filter(function (w) { return !w.Disabled; }));
            this.scrollToActive();
        }
    };
    pgSelectFXComponent.prototype.handleKeyUpEvent = function ($event) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.preOption(this._activeFilterOption, this._filterOptions.filter(function (w) { return !w.Disabled; }));
            this.scrollToActive();
        }
    };
    pgSelectFXComponent.prototype.preOption = function (option, options) {
        return options[options.indexOf(option) - 1] || options[options.length - 1];
    };
    pgSelectFXComponent.prototype.nextOption = function (option, options) {
        return options[options.indexOf(option) + 1] || options[0];
    };
    pgSelectFXComponent.prototype.clearSearchText = function () {
        this._searchText = '';
        this.updateFilterOption();
    };
    pgSelectFXComponent.prototype.updateFilterOption = function (updateActiveFilter) {
        if (updateActiveFilter === void 0) { updateActiveFilter = true; }
        if (this.Filter) {
            this._filterOptions = new option_pipe_1.OptionPipe().transform(this._options, {
                'searchText': this._searchText,
                'tags': this._isTags,
                'notFoundContent': this._isTags ? this._searchText : this._notFoundContent,
                'disabled': !this._isTags,
                'value': this._isTags ? this._searchText : 'disabled'
            });
        }
        else {
            this._filterOptions = this._options;
        }
        /** TODO: cause pre & next key selection not work */
        if (updateActiveFilter && !this._selectedOption) {
            this._activeFilterOption = this._filterOptions[0];
        }
    };
    pgSelectFXComponent.prototype.onSearchChange = function (searchValue) {
        this.SearchChange.emit(searchValue);
    };
    pgSelectFXComponent.prototype.onClick = function (e) {
        e.preventDefault();
        if (!this._disabled) {
            this.Open = !this.Open;
        }
    };
    pgSelectFXComponent.prototype.onKeyDown = function (e) {
        var keyCode = e.keyCode;
        if (keyCode === keycodes_1.TAB && this.Open) {
            this.Open = false;
            return;
        }
        if ((keyCode !== keycodes_1.DOWN_ARROW && keyCode !== keycodes_1.ENTER) || this.Open) {
            return;
        }
        e.preventDefault();
        if (!this._disabled) {
            this.Open = true;
        }
    };
    pgSelectFXComponent.prototype.closeDropDown = function () {
        var _this = this;
        if (!this.Open) {
            return;
        }
        this._openBackdrop = false;
        this._backDropStyles = {
            "transform": 'scale3d(1,1,1)'
        };
        setTimeout(function () {
            _this.onTouched();
            _this.clearSearchText();
            _this.Open = false;
        }, 300);
    };
    pgSelectFXComponent.prototype.setClassMap = function () {
        var _a;
        var _this = this;
        this._classList.forEach(function (_className) {
            _this._renderer.removeClass(_this._el, _className);
        });
        this._classList = [
            this._prefixCls,
            (this._mode === 'combobox') && this._prefixCls + "-combobox",
            (!this._disabled) && this._prefixCls + "-enabled",
            (this._disabled) && this._prefixCls + "-disabled",
            this._isOpen && this._prefixCls + "-open",
            this._size && this._prefixCls + "-" + this._size
        ].filter(function (item) {
            return !!item;
        });
        this._classList.forEach(function (_className) {
            _this._renderer.addClass(_this._el, _className);
        });
        this._selectionClassMap = (_a = {},
            _a[this._selectionPrefixCls] = true,
            _a[this._selectionPrefixCls + "--single"] = !this.Multiple,
            _a[this._selectionPrefixCls + "--multiple"] = this.Multiple,
            _a);
    };
    pgSelectFXComponent.prototype.setDropDownClassMap = function () {
        // setTimeout(()=>{ 
        //   this._dropDownClassMap = {
        //     [' cs-active']                               : true,
        //   }
        // },300);
    };
    pgSelectFXComponent.prototype.scrollToActive = function () {
        var _this = this;
        /** wait for dropdown display */
        setTimeout(function (_) {
            if (_this._activeFilterOption && _this._activeFilterOption.Value) {
                var index = _this._filterOptions.findIndex(function (option) { return option.Value === _this._activeFilterOption.Value; });
                try {
                    var scrollPane = _this.dropdownUl.nativeElement.children[index];
                    // TODO: scrollIntoViewIfNeeded is not a standard API, why doing so?
                    /* tslint:disable-next-line:no-any */
                    scrollPane.scrollIntoViewIfNeeded(false);
                }
                catch (e) {
                }
            }
        });
    };
    pgSelectFXComponent.prototype.flushComponentState = function () {
        this.updateFilterOption();
        if (!this.Multiple) {
            this.updateSelectedOption(this._value);
        }
        else {
            if (this._value) {
                this.updateSelectedOption(this._value);
            }
        }
    };
    pgSelectFXComponent.prototype._setTriggerWidth = function () {
        var _this = this;
        this._triggerWidth = this._getTriggerRect().width;
        var rect = this._getTriggerRect();
        /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
        setTimeout(function () {
            if (_this._cdkOverlay && _this._cdkOverlay.overlayRef) {
                _this._cdkOverlay.overlayRef.updateSize({
                    width: _this._triggerWidth,
                    height: rect.height,
                });
            }
        });
    };
    pgSelectFXComponent.prototype._getTriggerRect = function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    pgSelectFXComponent.prototype.writeValue = function (value) {
        this._updateValue(value, false);
    };
    pgSelectFXComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgSelectFXComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgSelectFXComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    pgSelectFXComponent.prototype.dropDownScroll = function (ul) {
        if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
            this.ScrollToBottom.emit(true);
        }
    };
    pgSelectFXComponent.prototype.checkDropDownScroll = function () {
        if (this.dropdownUl && (this.dropdownUl.nativeElement.scrollHeight === this.dropdownUl.nativeElement.clientHeight)) {
            this.ScrollToBottom.emit(true);
        }
    };
    pgSelectFXComponent.prototype.ngAfterContentInit = function () {
        if (this._value != null) {
            this.flushComponentState();
        }
    };
    pgSelectFXComponent.prototype.ngOnInit = function () {
        this.updateFilterOption();
        this.setClassMap();
        this.setDropDownClassMap();
    };
    pgSelectFXComponent.prototype.ngAfterContentChecked = function () {
        if (this._cacheOptions !== this._options) {
            /** update filter option after every content check cycle */
            this.updateFilterOption();
            this._cacheOptions = this._options;
        }
        else {
            this.updateFilterOption(false);
        }
    };
    pgSelectFXComponent.prototype._updateValue = function (value, emitChange) {
        if (emitChange === void 0) { emitChange = true; }
        if (this._value === value) {
            return;
        }
        if ((value == null) && this.Multiple) {
            this._value = [];
        }
        else {
            this._value = value;
        }
        if (!this.Multiple) {
            if (value == null) {
                this._selectedOption = null;
            }
            else {
                this.updateSelectedOption(value);
            }
        }
        else {
            if (value) {
                if (value.length === 0) {
                    this.clearAllSelectedOption(emitChange);
                }
                else {
                    this.updateSelectedOption(value, true);
                }
            }
            else if (value == null) {
                this.clearAllSelectedOption(emitChange);
            }
        }
    };
    var pgSelectFXComponent_1;
    __decorate([
        core_1.ViewChild('searchInput', { static: false }),
        __metadata("design:type", Object)
    ], pgSelectFXComponent.prototype, "searchInputElementRef", void 0);
    __decorate([
        core_1.ViewChild('trigger', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectFXComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.ViewChild('dropdownUl', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectFXComponent.prototype, "dropdownUl", void 0);
    __decorate([
        core_1.ViewChild('csOptions', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectFXComponent.prototype, "csOptions", void 0);
    __decorate([
        core_1.ViewChild('placeHolder', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectFXComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectFXComponent.prototype, "SearchChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectFXComponent.prototype, "OpenChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectFXComponent.prototype, "ScrollToBottom", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSelectFXComponent.prototype, "Filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSelectFXComponent.prototype, "MaxMultiple", void 0);
    __decorate([
        core_1.ViewChild(overlay_1.CdkConnectedOverlay, { static: true }),
        __metadata("design:type", overlay_1.CdkConnectedOverlay)
    ], pgSelectFXComponent.prototype, "_cdkOverlay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "AllowClear", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "KeepUnListOptions", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectFXComponent.prototype, "Mode", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "Multiple", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectFXComponent.prototype, "PlaceHolder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectFXComponent.prototype, "NotFoundContent", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectFXComponent.prototype, "Size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "Tags", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectFXComponent.prototype, "Open", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], pgSelectFXComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], pgSelectFXComponent.prototype, "onKeyDown", null);
    pgSelectFXComponent = pgSelectFXComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-select-fx',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgSelectFXComponent_1; }),
                    multi: true
                }
            ],
            animations: [
                dropdown_animations_1.dropDownAnimation,
                tag_animations_1.tagAnimation
            ],
            templateUrl: './select.component.html',
            styleUrls: [
                './style/index.scss',
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], pgSelectFXComponent);
    return pgSelectFXComponent;
}());
exports.pgSelectFXComponent = pgSelectFXComponent;
//# sourceMappingURL=select.component.js.map