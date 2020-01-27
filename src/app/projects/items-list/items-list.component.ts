import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from './items.service';
import { FieldService } from '../../fields/field.service';

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
  columnLoaded = false;

  @Input() projectId;
  constructor(private itemsService: ItemsService, private fieldService: FieldService) { }

  ngOnInit() {
    this.itemsService.getItemsByProject(this.projectId).subscribe((items: any) => {
      this.items = items
    });
    this.fieldService.getFields().subscribe((fields: any) => {
      fields.forEach(field => {
        this.itemCulomns.push({
          headerName: field.label,
          field: field.techName
        });
      });
      this.columnLoaded = true;
    })

    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true
    };
  }

}
