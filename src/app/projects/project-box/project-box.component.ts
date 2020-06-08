import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-box',
  templateUrl: './project-box.component.html',
  styleUrls: ['./project-box.component.scss']
})
export class ProjectBoxComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() description: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openProject() {
    this.router.navigate(['/projects', this.id]);
  }

}
