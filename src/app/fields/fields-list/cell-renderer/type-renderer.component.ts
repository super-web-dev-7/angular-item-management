import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular/main";

@Component({
    selector: 'app-type-cell',
    template: `<app-field-type [type]="params.value"></app-field-type>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class TypeRendererComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }
}