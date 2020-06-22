import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RootLayout} from '../root/root.component';
import {getProjects} from '@app/store/reducers/projects-reducer';
import {IProject} from '@app/models/project';
import {GetProjectsAction} from '@app/store/actions/projects.actions';


@Component({
    selector: 'corporate-layout',
    templateUrl: './corporate.component.html',
    styleUrls: ['./corporate.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CorporateLayout extends RootLayout implements OnInit {
    menuLinks: any = [
        {
            label: 'Dashboard',
            details: '12 New Updates',
            routerLink: '/projects',
            iconType: 'pg',
            iconName: 'home',
            thumbNailClass: 'text-white'
        },
        {
            label: 'Projects',
            details: '12 New Updates',
            routerLink: '/projects',
            iconType: 'pg',
            iconName: 'home',
            thumbNailClass: 'text-white'
        },
    ];

    setupLinks: any = [
        {
            label: 'Types',
            routerLink: '/project-types',
            iconType: 'pg',
            iconName: 'home',
            thumbNailClass: 'text-white'
        },
        {
            label: 'Users',
            routerLink: '/project-types',
            iconType: 'pg',
            iconName: 'home',
            thumbNailClass: 'text-white'
        },
    ];

    projectItems: any = [];


    ngOnInit() {
        this.changeLayout('menu-pin');
        this.changeLayout('menu-behind');
        // Will sidebar close on screens below 1024
        this.autoHideMenuPin();
        this._footer = false;

        this.store.select(getProjects)
            .subscribe(
                projects => {
                    this.projectItems = [];
                    projects.forEach(project => {
                        this.projectItems.push({
                            label: project.name,
                            routerLink: `/projects/${project._id}`
                        });
                    });

                }
            );

        this.store.dispatch(GetProjectsAction());
    }

}
