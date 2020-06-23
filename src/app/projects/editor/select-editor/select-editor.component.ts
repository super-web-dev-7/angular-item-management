import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';

declare var $: any;

@Component({
    selector: 'app-select-editor',
    templateUrl: './select-editor.component.html',
    styleUrls: ['./select-editor.component.scss']
})
export class SelectEditorComponent implements OnInit, ICellEditorAngularComp, AfterViewInit {

    private params: any;
    public value: any;
    @ViewChild('select', {read: ElementRef, static: false}) select: ElementRef;
    // error: any;
    ERROR_REQUIRED = 'This field is required';
    isCancel = false;
    tooltip: any;

    constructor(config: NgbTooltipConfig) {
        config.placement = 'bottom';
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const _this = this;
        $(document).ready(function () {
            $('#cell-edit select').selectpicker();
            $('#cell-edit select').selectpicker('val', _this.params.value !== undefined ? _this.params.value : null)
            _this.hideTooltip(_this.tooltip);
            _this.isCancel = false;
        });
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
    }

    onChange(event, tooltip) {
        this.tooltip = tooltip;
        if (event.target.type === 'select-one') {
            this.value = event.target.value;
        } else {
            this.value = [];
            for (const selectedOption of event.target.selectedOptions) {
                this.value.push(selectedOption.value);
            }
        }

        if (this.params.option.isRequired && (this.value === '' || this.value.length === 0)) {
            this.showTooltip(tooltip, this.ERROR_REQUIRED);
            this.isCancel = true;
            return;
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
        $('.bootstrap-select.open').removeClass('open');
        return this.value;
    }

    // isPopup(): boolean {
    //     return true;
    // }

}
