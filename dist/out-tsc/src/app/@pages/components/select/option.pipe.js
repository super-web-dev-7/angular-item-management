"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var core_1 = require("@angular/core");
var OptionPipe = /** @class */ (function () {
    function OptionPipe() {
    }
    // TODO: enable type checking for this method
    OptionPipe.prototype.transform = function (options, value) {
        if (value.searchText) {
            var _options = options.filter(function (option) { return option.Label && (option.Label.toLowerCase().indexOf(value.searchText.toLowerCase()) !== -1); });
            if (value.tags) {
                _options = options.filter(function (option) { return option.Label && (option.Label.toLowerCase() === value.searchText.toLowerCase()); });
            }
            if (_options.length) {
                return _options;
            }
            else {
                return [{
                        Value: value.value,
                        _value: value.value,
                        Disabled: value.disabled,
                        _disabled: value.disabled,
                        Label: value.notFoundContent,
                        _label: value.notFoundContent,
                    }
                ];
            }
        }
        else {
            return options;
        }
    };
    OptionPipe = __decorate([
        core_1.Pipe({ name: 'OptionPipe' })
    ], OptionPipe);
    return OptionPipe;
}());
exports.OptionPipe = OptionPipe;
//# sourceMappingURL=option.pipe.js.map