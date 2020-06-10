import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-type-details',
  templateUrl: './project-type-details.component.html',
  styleUrls: ['./project-type-details.component.scss']
})
export class ProjectTypeDetailsComponent implements OnInit {

  subscription: Subscription;
  projectTypeId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.projectTypeId = params['id'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
