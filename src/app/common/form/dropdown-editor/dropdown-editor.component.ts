import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-editor',
  templateUrl: './dropdown-editor.component.html',
  styleUrls: ['./dropdown-editor.component.scss']
})
export class DropdownEditorComponent implements OnInit {

  constructor() { }

  selected = {id: 0, text: ""};

  @Input()
  options: {id, text}[] = [];

  ngOnInit() {
    this.options.push({id:1, text: "Hi1" });
    this.options.push({id:2, text: "Hi2" });
    this.options.push({id:3, text: "Hi3" });
    this.options.push({id:4, text: "Hi4" });
  }

  selectOption(selectedOption) {
    this.selected = selectedOption;
  }

}
