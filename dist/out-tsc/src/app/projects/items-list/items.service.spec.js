"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var items_service_1 = require("./items.service");
describe('ItemsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(items_service_1.ItemsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=items.service.spec.js.map