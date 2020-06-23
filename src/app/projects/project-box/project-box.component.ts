import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { faTree } from '@fortawesome/pro-duotone-svg-icons';
import { faThumbtack} from '@fortawesome/pro-light-svg-icons';
import { Store } from '@ngrx/store';
import { ProjectTypesState } from '@app/store/states/project-types.state';
import { getTypes } from '@app/store/reducers/project-types.reducer';
import { GetProjectTypesAction } from '@app/store/actions/project-types.actions';

@Component({
  selector: 'app-project-box',
  templateUrl: './project-box.component.html',
  styleUrls: ['./project-box.component.scss'],
  animations: [
    trigger('showHideAnimation', [
      transition(':enter', [ 
        style({ opacity: 0, top: '-30px' }),
        animate('150ms', style({ opacity: 1, top: '0' }))
      ]),
      transition(':leave', [ 
        animate('150ms', style({ opacity: 0, top: '-20px' }))
      ])
    ]),
  ]
})
export class ProjectBoxComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() description: string;
  @Input() pinned: boolean;

  showActions = false;
  icon = faTree;
  projectTypes;
  typeName: string;
  pinnedIcon = faThumbtack;
  
  constructor(private router: Router, private store: Store<ProjectTypesState>) { }

  ngOnInit() {
    this.store.select(getTypes)
    .subscribe(
      types => {
        this.projectTypes = types;
        this.updateTypeName();
      }
    );

  this.store.dispatch(GetProjectTypesAction());
  }

  openProject() {
    this.router.navigate(['/projects', this.id]);
  }

  updateTypeName() {
    this.projectTypes.forEach(type => {
      if(type._id === this.type) {
        this.typeName = type.name;
      }
    });
  }

}
