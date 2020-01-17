import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  projects;
  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects().subscribe((projects) => {
      console.log(projects);
      this.projects = projects;
    });
  }

}
