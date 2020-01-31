import { Component, OnInit } from '@angular/core';
import {ProjectTypeService} from '../project-type.service';

@Component({
  selector: 'app-project-types-list',
  templateUrl: './project-types-list.component.html',
  styleUrls: ['./project-types-list.component.scss']
})
export class ProjectTypesListComponent implements OnInit {

  public projectTypes;

  constructor(private projectTypeService: ProjectTypeService) {

  }

  ngOnInit() {
    this.projectTypeService.getProjectTypes().subscribe(((projectTypes: any) => { this.projectTypes = projectTypes; console.log(projectTypes) }));
  }

}
