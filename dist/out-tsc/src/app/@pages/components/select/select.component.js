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
var pgSelectComponent = /** @class */ (function () {
    function pgSelectComponent(_elementRef, _renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._allowClear = false;
        this._disabled = false;
        this._isTags = false;
        this._isMultiple = false;
        this._keepUnListOptions = false;
        this._showSearch = false;
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
    pgSelectComponent_1 = pgSelectComponent;
    Object.defineProperty(pgSelectComponent.prototype, "AllowClear", {
        get: function () {
            return this._allowClear;
        },
        set: function (value) {
            this._allowClear = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "KeepUnListOptions", {
        get: function () {
            return this._keepUnListOptions;
        },
        set: function (value) {
            this._keepUnListOptions = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "Mode", {
        set: function (value) {
            this._mode = value;
            if (this._mode === 'multiple') {
                this.Multiple = true;
            }
            else if (this._mode === 'tags') {
                this.Tags = true;
            }
            else if (this._mode === 'combobox') {
                this.ShowSearch = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "Multiple", {
        get: function () {
            return this._isMultiple;
        },
        set: function (value) {
            this._isMultiple = convert_1.toBoolean(value);
            if (this._isMultiple) {
                this.ShowSearch = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "PlaceHolder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "NotFoundContent", {
        get: function () {
            return this._notFoundContent;
        },
        set: function (value) {
            this._notFoundContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "Size", {
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
    Object.defineProperty(pgSelectComponent.prototype, "ShowSearch", {
        get: function () {
            return this._showSearch;
        },
        set: function (value) {
            this._showSearch = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSelectComponent.prototype, "Tags", {
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
    Object.defineProperty(pgSelectComponent.prototype, "Disabled", {
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
    Object.defineProperty(pgSelectComponent.prototype, "Open", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            var _this = this;
            var isOpen = convert_1.toBoolean(value);
            if (this._isOpen === isOpen) {
                return;
            }
            if (isOpen) {
                this.scrollToActive();
                this._setTriggerWidth();
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
    pgSelectComponent.prototype.removeOption = function (option) {
        this._options.splice(this._options.indexOf(option), 1);
        if (!this._isTags) {
            this.forceUpdateSelectedOption(this._value);
        }
    };
    /** dropdown position changed */
    pgSelectComponent.prototype.onPositionChange = function (position) {
        this._dropDownPosition = position.connectionPair.originY;
    };
    pgSelectComponent.prototype.compositionStart = function () {
        this._composing = true;
    };
    pgSelectComponent.prototype.compositionEnd = function () {
        this._composing = false;
    };
    /** clear single selected option */
    pgSelectComponent.prototype.clearSelect = function ($event) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this._selectedOption = null;
        this.Value = null;
        this.onChange(null);
    };
    /** click dropdown option by user */
    pgSelectComponent.prototype.clickOption = function (option, $event) {
        if (!option) {
            return;
        }
        this.chooseOption(option, true, $event);
        this.clearSearchText();
        if (!this._isMultiple) {
            this.Open = false;
        }
    };
    /** choose option */
    pgSelectComponent.prototype.chooseOption = function (option, isUserClick, $event) {
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
    pgSelectComponent.prototype.updateWidth = function (element, text) {
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
    pgSelectComponent.prototype.isInSet = function (set, option) {
        return (Array.from(set).find(function (data) { return data.Value === option.Value; }));
    };
    /** select multiple option */
    pgSelectComponent.prototype.selectMultipleOption = function (option, $event) {
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
    pgSelectComponent.prototype.emitMultipleOptions = function () {
        if (this._isMultiInit) {
            return;
        }
        var arrayOptions = Array.from(this._selectedOptions);
        this._value = arrayOptions.map(function (item) { return item.Value; });
        this.onChange(this._value);
    };
    /** update selected option when add remove option etc */
    pgSelectComponent.prototype.updateSelectedOption = function (currentModelValue, triggerByNgModel) {
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
    pgSelectComponent.prototype.forceUpdateSelectedOption = function (value) {
        var _this = this;
        /** trigger dirty check */
        setTimeout(function (_) {
            _this.updateSelectedOption(value);
        });
    };
    Object.defineProperty(pgSelectComponent.prototype, "Value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSelectComponent.prototype.clearAllSelectedOption = function (emitChange) {
        var _this = this;
        if (emitChange === void 0) { emitChange = true; }
        this._selectedOptions.forEach(function (item) {
            _this.unSelectMultipleOption(item, null, emitChange);
        });
    };
    pgSelectComponent.prototype.handleKeyEnterEvent = function (event) {
        /** when composing end */
        if (!this._composing && this._isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this.updateFilterOption(false);
            this.clickOption(this._activeFilterOption);
        }
    };
    pgSelectComponent.prototype.handleKeyBackspaceEvent = function (event) {
        if ((!this._searchText) && (!this._composing) && (this._isMultiple)) {
            event.preventDefault();
            var lastOption = Array.from(this._selectedOptions).pop();
            this.unSelectMultipleOption(lastOption);
        }
    };
    pgSelectComponent.prototype.handleKeyDownEvent = function ($event) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.nextOption(this._activeFilterOption, this._filterOptions.filter(function (w) { return !w.Disabled; }));
            this.scrollToActive();
        }
    };
    pgSelectComponent.prototype.handleKeyUpEvent = function ($event) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.preOption(this._activeFilterOption, this._filterOptions.filter(function (w) { return !w.Disabled; }));
            this.scrollToActive();
        }
    };
    pgSelectComponent.prototype.preOption = function (option, options) {
        return options[options.indexOf(option) - 1] || options[options.length - 1];
    };
    pgSelectComponent.prototype.nextOption = function (option, options) {
        return options[options.indexOf(option) + 1] || options[0];
    };
    pgSelectComponent.prototype.clearSearchText = function () {
        this._searchText = '';
        this.updateFilterOption();
    };
    pgSelectComponent.prototype.updateFilterOption = function (updateActiveFilter) {
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
    pgSelectComponent.prototype.onSearchChange = function (searchValue) {
        this.SearchChange.emit(searchValue);
    };
    pgSelectComponent.prototype.onClick = function (e) {
        var _this = this;
        e.preventDefault();
        if (!this._disabled) {
            this.Open = !this.Open;
            if (this.ShowSearch) {
                /** wait for search display */
                setTimeout(function (_) {
                    _this.searchInputElementRef.nativeElement.focus();
                });
            }
        }
    };
    pgSelectComponent.prototype.onKeyDown = function (e) {
        var _this = this;
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
            if (this.ShowSearch) {
                /** wait for search display */
                setTimeout(function (_) {
                    _this.searchInputElementRef.nativeElement.focus();
                });
            }
        }
    };
    pgSelectComponent.prototype.closeDropDown = function () {
        if (!this.Open) {
            return;
        }
        this.onTouched();
        if (this.Multiple) {
            this._renderer.removeStyle(this.searchInputElementRef.nativeElement, 'width');
        }
        this.clearSearchText();
        this.Open = false;
    };
    pgSelectComponent.prototype.setClassMap = function () {
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
            this._showSearch && this._prefixCls + "-show-search",
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
    pgSelectComponent.prototype.setDropDownClassMap = function () {
        var _a;
        this._dropDownClassMap = (_a = {},
            _a[this._dropDownPrefixCls] = true,
            _a['component-select'] = this._mode === 'combobox',
            _a[this._dropDownPrefixCls + "--single"] = !this.Multiple,
            _a[this._dropDownPrefixCls + "--multiple"] = this.Multiple,
            _a[this._dropDownPrefixCls + "-placement-bottomLeft"] = this._dropDownPosition === 'bottom',
            _a[this._dropDownPrefixCls + "-placement-topLeft"] = this._dropDownPosition === 'top',
            _a);
    };
    pgSelectComponent.prototype.scrollToActive = function () {
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
    pgSelectComponent.prototype.flushComponentState = function () {
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
    pgSelectComponent.prototype._setTriggerWidth = function () {
        this._triggerWidth = this._getTriggerRect().width;
        /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
        if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
            this._cdkOverlay.overlayRef.updateSize({
                width: this._triggerWidth
            });
        }
    };
    pgSelectComponent.prototype._getTriggerRect = function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    pgSelectComponent.prototype.writeValue = function (value) {
        this._updateValue(value, false);
    };
    pgSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    pgSelectComponent.prototype.dropDownScroll = function (ul) {
        if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
            this.ScrollToBottom.emit(true);
        }
    };
    pgSelectComponent.prototype.checkDropDownScroll = function () {
        if (this.dropdownUl && (this.dropdownUl.nativeElement.scrollHeight === this.dropdownUl.nativeElement.clientHeight)) {
            this.ScrollToBottom.emit(true);
        }
    };
    pgSelectComponent.prototype.ngAfterContentInit = function () {
        if (this._value != null) {
            this.flushComponentState();
        }
    };
    pgSelectComponent.prototype.ngOnInit = function () {
        this.updateFilterOption();
        this.setClassMap();
        this.setDropDownClassMap();
    };
    pgSelectComponent.prototype.ngAfterContentChecked = function () {
        if (this._cacheOptions !== this._options) {
            /** update filter option after every content check cycle */
            this.updateFilterOption();
            this._cacheOptions = this._options;
        }
        else {
            this.updateFilterOption(false);
        }
    };
    pgSelectComponent.prototype._updateValue = function (value, emitChange) {
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
    var pgSelectComponent_1;
    __decorate([
        core_1.ViewChild('searchInput', { static: false }),
        __metadata("design:type", Object)
    ], pgSelectComponent.prototype, "searchInputElementRef", void 0);
    __decorate([
        core_1.ViewChild('trigger', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.ViewChild('dropdownUl', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], pgSelectComponent.prototype, "dropdownUl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectComponent.prototype, "SearchChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectComponent.prototype, "OpenChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgSelectComponent.prototype, "ScrollToBottom", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSelectComponent.prototype, "Filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSelectComponent.prototype, "MaxMultiple", void 0);
    __decorate([
        core_1.ViewChild(overlay_1.CdkConnectedOverlay, { static: true }),
        __metadata("design:type", overlay_1.CdkConnectedOverlay)
    ], pgSelectComponent.prototype, "_cdkOverlay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "AllowClear", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "KeepUnListOptions", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectComponent.prototype, "Mode", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "Multiple", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectComponent.prototype, "PlaceHolder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectComponent.prototype, "NotFoundContent", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSelectComponent.prototype, "Size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "ShowSearch", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "Tags", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSelectComponent.prototype, "Open", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], pgSelectComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], pgSelectComponent.prototype, "onKeyDown", null);
    pgSelectComponent = pgSelectComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-select',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgSelectComponent_1; }),
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
    ], pgSelectComponent);
    return pgSelectComponent;
}());
exports.pgSelectComponent = pgSelectComponent;
//# sourceMappingURL=select.component.js.map