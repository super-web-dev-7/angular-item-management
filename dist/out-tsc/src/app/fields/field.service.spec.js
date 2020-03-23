"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var field_service_1 = require("./field.service");
describe('FieldService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(field_service_1.FieldService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=field.service.spec.js.map