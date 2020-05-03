import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { faArchive, faStar } from '@fortawesome/pro-light-svg-icons';
import { Store } from '@ngrx/store';
import { ProjectsState } from '@app/store/states/projects.state';
import { BeginDeleteProjectAction } from '@app/store/actions/projects.actions';

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
  pinIcon = faStar;

  constructor(private store: Store<ProjectsState>) {

  }

  ngOnInit() {
  }

  onDelete() {
    this.store.dispatch(BeginDeleteProjectAction({ payload: this.projectId }));
  }
}
