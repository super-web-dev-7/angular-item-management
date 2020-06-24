import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { ProjectsService } from '../projects.service';
import { faShare, faFile } from '@fortawesome/pro-light-svg-icons';


@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit, AfterViewInit {

    subscription;
    projectId;
    itemSelectionView = false;
    project;

    publishIcon = faShare;
    generateIcon = faFile;

    constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.projectId = params['id'];
            this.projectsService.getProject(this.projectId).subscribe((project) => {
                this.project = project;
            })
        });

    }

    ShowItemSelection(event) {
        if (event.target.text) {
            if (event.target.text.trim() === 'Items') {
                if (localStorage.getItem('copydata')) {
                    this.itemSelectionView = true;
                }
            }
        }
    }

    ngAfterViewInit() {

    }
}
