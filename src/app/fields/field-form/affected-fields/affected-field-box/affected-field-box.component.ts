import { Component, OnInit, Input } from '@angular/core';
import { IField } from '@app/models/field.model';

@Component({
  selector: 'app-affected-field-box',
  templateUrl: './affected-field-box.component.html',
  styleUrls: ['./affected-field-box.component.scss']
})
export class AffectedFieldBoxComponent implements OnInit {

  @Input() affectedField: IField;
  @Input() affectedFieldDef;

  constructor() { }

  ngOnInit() {
  }

}
