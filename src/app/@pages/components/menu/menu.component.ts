import {Component, OnInit, Input, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    PerfectScrollbarConfigInterface,
    PerfectScrollbarComponent, PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import {CreateProjectComponent} from '@app/common/common-forms/create-project/create-project.component';

@Component({
    selector: 'pg-menu-items',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [
        trigger('toggleHeight', [
            state('close', style({
                height: '0',
                overflow: 'hidden',
                marginBottom: '0',
                display: 'none',

            })),
            state('open', style({
                display: 'block',
                height: '*',
                marginBottom: '10px',
                overflow: 'hidden',
            })),
            transition('close => open', animate('140ms ease-in')),
            transition('open => close', animate('140ms ease-out'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
    menuItems = [];
    setupItems = [];
    projectItems = [];
    currentItem = null;
    isPerfectScrollbarDisabled = false;
    public config: PerfectScrollbarConfigInterface = {};

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.togglePerfectScrollbar();
        });
    }

    @HostListener('window:resize', [])
    onResize() {
        this.togglePerfectScrollbar();
    }

    togglePerfectScrollbar() {
        this.isPerfectScrollbarDisabled = window.innerWidth < 1025;
    }

    @Input()
    set Items(value) {
        this.menuItems = value;
    }

    @Input()
    set Projects(value) {
        this.projectItems = value;
    }

    @Input()
    set SetupItems(value) {
        this.setupItems = value;
    }

    toggleNavigationSub(event, item) {
        event.preventDefault();
        if (this.currentItem && this.currentItem != item) {
            this.currentItem['toggle'] = 'close';
        }
        this.currentItem = item;
        item.toggle = (item.toggle === 'close' ? 'open' : 'close');
    }
}
