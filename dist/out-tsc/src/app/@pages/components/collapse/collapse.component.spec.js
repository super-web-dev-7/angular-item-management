"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var collapse_component_1 = require("./collapse.component");
var collapseset_component_1 = require("./collapseset.component");
describe('My First Test', function () {
    it('should get "Hello Taobao"', function () { return null; });
});
describe('NzCollapsesetComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [collapse_component_1.NzCollapseComponent, collapseset_component_1.NzCollapsesetComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(collapseset_component_1.NzCollapsesetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('测试input - accordion : string', function () {
        component.nzAccordion = true;
        fixture.detectChanges();
        // expect(a).toEqual(b);
    });
});
//# sourceMappingURL=collapse.component.spec.js.map