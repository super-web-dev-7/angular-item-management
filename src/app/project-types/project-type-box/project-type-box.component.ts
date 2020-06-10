import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-type-box',
  templateUrl: './project-type-box.component.html',
  styleUrls: ['./project-type-box.component.scss']
})
export class ProjectTypeBoxComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }
}
