import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'app-number-editor',
    templateUrl: './number-editor.component.html',
    styleUrls: ['./number-editor.component.scss']
})
export class NumberEditorComponent implements OnInit, ICellEditorAngularComp, AfterViewInit {

    private params: any;
    public value: any;
    @ViewChild('input', {read: ElementRef, static: false}) input: ElementRef;
    ERROR_REQUIRED = 'This field is required';
    isCancel = false;

    constructor(config: NgbTooltipConfig) {
        config.placement = 'bottom';
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
    }

    afterGuiAttached(params?: any): void {
        document.getElementById('number-editor').focus();
    }


    getMinMaxValueErrorMessage() {
        return 'Value must be between ' +
            this.params.option.options.minValue + ' and ' + this.params.option.options.maxValue + '.';
    }

    getDecimalErrorMessage() {
        return 'Please enter a valid value. The two nearest valid values are ' +
            Math.floor(this.value) + ' and ' + Math.floor(this.value + 1);
    }

    onChange(tooltip) {
        if (this.params.option.isRequired && this.value === '') {
            this.showTooltip(tooltip, this.ERROR_REQUIRED);
            this.isCancel = true;
            return;
        } else {
            this.hideTooltip(tooltip);
            this.isCancel = false;
        }

        if (this.value < this.params.option.options.minValue || this.value > this.params.option.options.maxValue) {
            this.showTooltip(tooltip, this.getMinMaxValueErrorMessage());
            this.isCancel = true;
            return;
        } else {
            this.hideTooltip(tooltip);
            this.isCancel = false;
        }

        if (!this.params.option.options.allowDecimal) {
            if (this.value % 1 !== 0) {
                this.showTooltip(tooltip, this.getDecimalErrorMessage());
                this.isCancel = true;
            } else {
                this.hideTooltip(tooltip);
                this.isCancel = false;
            }
        }
    }

    showTooltip(tooltip, error) {
        if (tooltip.isOpen()) {
            tooltip.close();
            tooltip.open({error});
        } else {
            tooltip.open({error});
        }
    }

    hideTooltip(tooltip) {
        if (tooltip.isOpen()) {
            tooltip.close();
        }
    }

    isCancelBeforeStart(): boolean {
        return this.params.option.readonly === true;
    }

    isCancelAfterEnd(): boolean {
        return this.isCancel;
    }

    getValue(): any {
        return this.value;
    }

}
