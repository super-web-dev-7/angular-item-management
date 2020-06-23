import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, ICellEditorAngularComp, AfterViewInit {

    private params: any;
    public value: any;
    @ViewChild('input', {static: false}) input: ElementRef;
    // error: any;
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
        document.getElementById('text-editor').focus();
    }

    getMinLengthErrorMessage() {
        return 'Please lengthen this text to ' +
            this.params.option.options.minLength + ' characters or more (you are currently using ' + this.value.length + ' character).\n';
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

        if (this.params.option.options.minLength && this.value.length < this.params.option.options.minLength) {
            this.showTooltip(tooltip, this.getMinLengthErrorMessage());
            this.isCancel = true;
        } else {
            this.hideTooltip(tooltip);
            this.isCancel = false;
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
