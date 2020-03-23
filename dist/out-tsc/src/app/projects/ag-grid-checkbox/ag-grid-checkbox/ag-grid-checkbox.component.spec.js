"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ag_grid_checkbox_component_1 = require("./ag-grid-checkbox.component");
describe('AgGridCheckboxComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [ag_grid_checkbox_component_1.AgGridCheckboxComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(ag_grid_checkbox_component_1.AgGridCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ag-grid-checkbox.component.spec.js.map