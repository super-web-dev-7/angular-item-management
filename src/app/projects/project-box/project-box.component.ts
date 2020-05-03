import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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

  showActions = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openProject() {
    this.router.navigate(['/projects', this.id]);
  }

  deleteProject() {

  }

}
