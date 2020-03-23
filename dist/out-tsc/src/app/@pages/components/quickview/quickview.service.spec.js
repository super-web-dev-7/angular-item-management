"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var quickview_service_1 = require("./quickview.service");
describe('QuickviewService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [quickview_service_1.QuickviewService]
        });
    });
    it('should be created', testing_1.inject([quickview_service_1.QuickviewService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=quickview.service.spec.js.map