import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  itemCulomns = [];
  itemFields;
  items;
  defaultColDef;

  @Input() projectId;
  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getItemsByProject(this.projectId).subscribe((items: any) => {
      this.items = items
    });
    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true
    };

    this.itemCulomns.push({
      headerName: "project Id",
      field: "projectId"
    });
  }

}
