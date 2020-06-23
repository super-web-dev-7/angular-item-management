import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { faArchive, faThumbtack} from '@fortawesome/pro-light-svg-icons';
import { Store } from '@ngrx/store';
import { ProjectsState } from '@app/store/states/projects.state';
import { BeginDeleteProjectAction } from '@app/store/actions/projects.actions';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-box-actions',
  templateUrl: './project-box-actions.component.html',
  styleUrls: ['./project-box-actions.component.scss']
})
export class ProjectBoxActionsComponent implements OnInit {
  @Input() projectId;

  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  deleteIcon = faArchive;
  pinIcon = faThumbtack;

  constructor(private store: Store<ProjectsState>, private projectsService: ProjectsService) {

  }

  ngOnInit() {
  }

  onDelete() {
    this.store.dispatch(BeginDeleteProjectAction({ payload: this.projectId }));
  }

  onPin() {
    this.projectsService.pinProject(this.projectId).subscribe(e => {
      
    })
  }
}
